import { createHash, timingSafeEqual } from "node:crypto";
import { and, eq, gt, sql } from "drizzle-orm";
import { getDb } from "../db";
import { loginAttempts } from "../db/schema";

const MAX_PER_HOUR = 5;
const oneHourAgo = sql`now() - interval '1 hour'`;

/** Hash both sides first so the compare stays constant-time regardless of length. */
export function secretsMatch(given: string, expected: string): boolean {
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function tooManyLoginAttempts(ipHash: string | null): Promise<boolean> {
  if (!ipHash) return false;
  const recent = await getDb().$count(
    loginAttempts,
    and(eq(loginAttempts.ipHash, ipHash), gt(loginAttempts.createdAt, oneHourAgo))
  );
  return recent >= MAX_PER_HOUR;
}

export async function recordLoginAttempt(ipHash: string | null): Promise<void> {
  if (!ipHash) return;
  await getDb().insert(loginAttempts).values({ ipHash });
}
