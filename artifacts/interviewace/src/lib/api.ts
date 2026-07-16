/**
 * Thin fetch wrapper for the API server.
 * The API server artifact is routed at /api-server by the Replit proxy,
 * which strips that prefix before forwarding to Express — so Express sees /api/...
 */
const API_BASE = "/api-server/api";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${path} failed ${res.status}: ${text}`);
  }
  return res.json();
}

export const api = {
  getMe: () => apiFetch<UserProfile>("/user/me"),
  saveSession: (body: { category: string; score: number; totalQuestions: number }) =>
    apiFetch("/user/sessions", { method: "POST", body: JSON.stringify(body) }),
  updateDailyChallenge: (completedCount: number) =>
    apiFetch("/user/daily-challenge", { method: "PATCH", body: JSON.stringify({ completedCount }) }),
};

export interface UserStats {
  totalSessions: number;
  avgScore: number;
  currentStreak: number;
  longestStreak: number;
}

export interface RecentSession {
  category: string;
  score: number;
  total_questions: number;
  completed_at: string;
}

export interface CategoryStat {
  category: string;
  accuracy: number;
  attempts: number;
}

export interface UserProfile {
  userId: number;
  stats: UserStats;
  recentSessions: RecentSession[];
  categoryStats: CategoryStat[];
  dailyChallenge: { completed_count: number; total_count: number };
}
