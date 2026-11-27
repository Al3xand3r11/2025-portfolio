import { sql } from "drizzle-orm";
import { boolean, check, index, integer, pgTable, smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";

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
    status: text("status").notNull().default("new"),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check("project_inquiries_status", sql`${t.status} in ('new', 'replied', 'archived')`),
    index("project_inquiries_created_at_idx").on(t.createdAt),
    index("project_inquiries_ip_hash_idx").on(t.ipHash, t.createdAt),
  ]
);

export const loginAttempts = pgTable(
  "login_attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("login_attempts_ip_hash_idx").on(t.ipHash, t.createdAt)]
);

export const healthChecks = pgTable(
  "health_checks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectSlug: text("project_slug").notNull(),
    checkId: text("check_id").notNull(),
    ok: boolean("ok").notNull(),
    statusCode: integer("status_code"),
    latencyMs: integer("latency_ms"),
    detail: text("detail"),
    trigger: text("trigger").notNull(),
    checkedAt: timestamp("checked_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check("health_checks_trigger", sql`${t.trigger} in ('cron', 'manual')`),
    index("health_checks_project_checked_at_idx").on(t.projectSlug, t.checkedAt),
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
    readAt: timestamp("read_at", { withTimezone: true }),
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
