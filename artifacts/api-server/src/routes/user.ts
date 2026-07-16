import { Router } from "express";
import { getAuth } from "@clerk/express";
import { query, getOrCreateUser } from "../lib/db";

const router = Router();

// Middleware: require a valid Clerk session
function requireAuth(req: any, res: any, next: any) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  req.clerkUserId = userId;
  next();
}

/**
 * GET /api/user/me
 * Returns the current user's profile and top-level stats.
 * JIT-provisions the user row on first call.
 */
router.get("/me", requireAuth, async (req: any, res) => {
  try {
    const userId = await getOrCreateUser(
      req.clerkUserId,
      req.body?.displayName,
      req.body?.email,
    );

    // Aggregate stats in one query
    const statsRes = await query(
      `SELECT
         COUNT(ps.id)::int                         AS total_sessions,
         COALESCE(ROUND(AVG(ps.score::numeric / NULLIF(ps.total_questions,0) * 100)), 0)::int AS avg_score,
         COALESCE(MAX(us.current_streak), 0)::int  AS current_streak,
         COALESCE(MAX(us.longest_streak), 0)::int  AS longest_streak
       FROM users u
       LEFT JOIN practice_sessions ps ON ps.user_id = u.id
       LEFT JOIN user_streaks us       ON us.user_id = u.id
       WHERE u.id = $1`,
      [userId],
    );

    const stats = statsRes.rows[0];

    // Recent sessions (last 5)
    const recentRes = await query(
      `SELECT category, score, total_questions, completed_at
       FROM practice_sessions
       WHERE user_id = $1
       ORDER BY completed_at DESC
       LIMIT 5`,
      [userId],
    );

    // Per-category accuracy
    const catRes = await query(
      `SELECT category,
              ROUND(AVG(score::numeric / NULLIF(total_questions,0) * 100))::int AS accuracy,
              COUNT(*)::int AS attempts
       FROM practice_sessions
       WHERE user_id = $1
       GROUP BY category`,
      [userId],
    );

    // Today's daily challenge progress
    const dcRes = await query(
      `SELECT completed_count, total_count
       FROM daily_challenge_progress
       WHERE user_id = $1 AND challenge_date = CURRENT_DATE`,
      [userId],
    );

    res.json({
      userId,
      stats: {
        totalSessions: stats.total_sessions ?? 0,
        avgScore: stats.avg_score ?? 0,
        currentStreak: stats.current_streak ?? 0,
        longestStreak: stats.longest_streak ?? 0,
      },
      recentSessions: recentRes.rows,
      categoryStats: catRes.rows,
      dailyChallenge: dcRes.rows[0] ?? { completed_count: 0, total_count: 10 },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/user/sessions
 * Save a completed practice session.
 * Body: { category, score, totalQuestions }
 */
router.post("/sessions", requireAuth, async (req: any, res) => {
  try {
    const { category, score, totalQuestions } = req.body;
    if (!category || score == null || !totalQuestions) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const userId = await getOrCreateUser(req.clerkUserId);
    await query(
      `INSERT INTO practice_sessions (user_id, category, score, total_questions)
       VALUES ($1, $2, $3, $4)`,
      [userId, category, score, totalQuestions],
    );

    // Update streak
    await query(
      `INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_practice_date)
       VALUES ($1, 1, 1, CURRENT_DATE)
       ON CONFLICT (user_id) DO UPDATE SET
         current_streak = CASE
           WHEN user_streaks.last_practice_date = CURRENT_DATE - 1 THEN user_streaks.current_streak + 1
           WHEN user_streaks.last_practice_date = CURRENT_DATE      THEN user_streaks.current_streak
           ELSE 1
         END,
         longest_streak = GREATEST(user_streaks.longest_streak,
           CASE
             WHEN user_streaks.last_practice_date = CURRENT_DATE - 1 THEN user_streaks.current_streak + 1
             WHEN user_streaks.last_practice_date = CURRENT_DATE      THEN user_streaks.current_streak
             ELSE 1
           END),
         last_practice_date = CURRENT_DATE`,
      [userId],
    );

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * PATCH /api/user/daily-challenge
 * Update today's daily challenge progress.
 * Body: { completedCount }
 */
router.patch("/daily-challenge", requireAuth, async (req: any, res) => {
  try {
    const { completedCount } = req.body;
    if (completedCount == null) {
      return res.status(400).json({ error: "Missing completedCount" });
    }

    const userId = await getOrCreateUser(req.clerkUserId);
    await query(
      `INSERT INTO daily_challenge_progress (user_id, challenge_date, completed_count)
       VALUES ($1, CURRENT_DATE, $2)
       ON CONFLICT (user_id, challenge_date) DO UPDATE
         SET completed_count = EXCLUDED.completed_count`,
      [userId, completedCount],
    );

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
