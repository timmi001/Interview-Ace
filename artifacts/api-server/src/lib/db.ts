import pg from "pg";
import { logger } from "./logger";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  logger.error({ err }, "Unexpected error on idle DB client");
});

/** Run a query. Throws on error. */
export async function query(text: string, params?: unknown[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  logger.debug({ query: text.slice(0, 80), ms: Date.now() - start, rows: res.rowCount }, "db");
  return res;
}

/**
 * JIT-provision a user row keyed by Clerk userId.
 * Returns the internal integer id.
 */
export async function getOrCreateUser(
  clerkUserId: string,
  displayName?: string,
  email?: string,
): Promise<number> {
  const existing = await query(
    "SELECT id FROM users WHERE clerk_user_id = $1",
    [clerkUserId],
  );
  if (existing.rows.length > 0) return existing.rows[0].id;

  const inserted = await query(
    `INSERT INTO users (clerk_user_id, display_name, email)
     VALUES ($1, $2, $3)
     ON CONFLICT (clerk_user_id) DO UPDATE SET display_name = EXCLUDED.display_name
     RETURNING id`,
    [clerkUserId, displayName ?? null, email ?? null],
  );
  return inserted.rows[0].id;
}
