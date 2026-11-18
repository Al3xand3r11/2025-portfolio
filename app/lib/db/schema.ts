import { sql } from "drizzle-orm";
import { boolean, check, index, pgTable, smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const projectInquiries = pgTable(
  "project_inquiries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    organization: text("organization"),
    budget: text("budget"),
    timeline: text("timeline"),
    inspiration: text("inspiration"),
    message: text("message"),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("project_inquiries_created_at_idx").on(t.createdAt),
    index("project_inquiries_ip_hash_idx").on(t.ipHash, t.createdAt),
  ]
);

export const feedbackSubmissions = pgTable(
  "feedback_submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    responsiveness: smallint("responsiveness"),
    timeSpent: smallint("time_spent"),
    wouldRecommend: smallint("would_recommend"),
    reportsProblem: boolean("reports_problem").notNull().default(false),
    project: text("project").notNull(),
    message: text("message"),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check("feedback_responsiveness_range", sql`${t.responsiveness} between 1 and 5`),
    check("feedback_time_spent_range", sql`${t.timeSpent} between 1 and 5`),
    check("feedback_would_recommend_range", sql`${t.wouldRecommend} between 1 and 5`),
    index("feedback_submissions_created_at_idx").on(t.createdAt),
    index("feedback_submissions_ip_hash_idx").on(t.ipHash, t.createdAt),
  ]
);
