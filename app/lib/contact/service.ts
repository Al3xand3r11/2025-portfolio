import { and, eq, gt, sql } from "drizzle-orm";
import { getDb } from "../db";
import { feedbackSubmissions, projectInquiries } from "../db/schema";
import type { FeedbackInput, ProjectInquiryInput } from "./schemas";

const MAX_PER_HOUR = 5;
const oneHourAgo = sql`now() - interval '1 hour'`;

export type CreateResult = "created" | "rate_limited";

export async function createProjectInquiry(
  input: ProjectInquiryInput,
  ipHash: string | null
): Promise<CreateResult> {
  const db = getDb();
  if (ipHash) {
    const recent = await db.$count(
      projectInquiries,
      and(eq(projectInquiries.ipHash, ipHash), gt(projectInquiries.createdAt, oneHourAgo))
    );
    if (recent >= MAX_PER_HOUR) return "rate_limited";
  }
  await db.insert(projectInquiries).values({ ...input, ipHash });
  return "created";
}

export async function createFeedback(
  input: FeedbackInput,
  ipHash: string | null
): Promise<CreateResult> {
  const db = getDb();
  if (ipHash) {
    const recent = await db.$count(
      feedbackSubmissions,
      and(eq(feedbackSubmissions.ipHash, ipHash), gt(feedbackSubmissions.createdAt, oneHourAgo))
    );
    if (recent >= MAX_PER_HOUR) return "rate_limited";
  }
  await db.insert(feedbackSubmissions).values({ ...input, ipHash });
  return "created";
}
