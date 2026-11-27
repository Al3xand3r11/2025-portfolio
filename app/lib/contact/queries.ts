import { and, desc, eq, gte, isNull, max, sql } from "drizzle-orm";
import { getDb } from "../db";
import { feedbackSubmissions, projectInquiries } from "../db/schema";
import type { ModuleSummary, Signal } from "../signals/types";

export const INQUIRY_STATUSES = ["new", "replied", "archived"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

const thirtyDaysAgo = sql`now() - interval '30 days'`;

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  budget: string | null;
  timeline: string | null;
  inspiration: string | null;
  message: string | null;
  status: InquiryStatus;
  createdAt: Date;
};

export type Feedback = {
  id: string;
  name: string | null;
  responsiveness: number | null;
  timeSpent: number | null;
  wouldRecommend: number | null;
  reportsProblem: boolean;
  project: string;
  message: string | null;
  readAt: Date | null;
  createdAt: Date;
};

function asDate(value: Date | string | null): Date | null {
  if (value == null) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function requiredDate(value: Date | string): Date {
  return asDate(value) ?? new Date(0);
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function asStatus(value: string): InquiryStatus {
  return (INQUIRY_STATUSES as readonly string[]).includes(value) ? (value as InquiryStatus) : "new";
}

export async function listInquiries(status?: InquiryStatus): Promise<Inquiry[]> {
  const rows = await getDb()
    .select({
      id: projectInquiries.id,
      name: projectInquiries.name,
      email: projectInquiries.email,
      organization: projectInquiries.organization,
      budget: projectInquiries.budget,
      timeline: projectInquiries.timeline,
      inspiration: projectInquiries.inspiration,
      message: projectInquiries.message,
      status: projectInquiries.status,
      createdAt: projectInquiries.createdAt,
    })
    .from(projectInquiries)
    .where(status ? eq(projectInquiries.status, status) : undefined)
    .orderBy(desc(projectInquiries.createdAt));

  return rows.map((row) => ({ ...row, status: asStatus(row.status), createdAt: requiredDate(row.createdAt) }));
}

export async function getInquiry(id: string): Promise<Inquiry | null> {
  if (!isUuid(id)) return null;
  const [row] = await getDb()
    .select({
      id: projectInquiries.id,
      name: projectInquiries.name,
      email: projectInquiries.email,
      organization: projectInquiries.organization,
      budget: projectInquiries.budget,
      timeline: projectInquiries.timeline,
      inspiration: projectInquiries.inspiration,
      message: projectInquiries.message,
      status: projectInquiries.status,
      createdAt: projectInquiries.createdAt,
    })
    .from(projectInquiries)
    .where(eq(projectInquiries.id, id))
    .limit(1);
  return row ? { ...row, status: asStatus(row.status), createdAt: requiredDate(row.createdAt) } : null;
}

export async function setInquiryStatus(id: string, status: InquiryStatus): Promise<void> {
  if (!isUuid(id)) return;
  await getDb().update(projectInquiries).set({ status }).where(eq(projectInquiries.id, id));
}

export async function listFeedback(project?: string): Promise<Feedback[]> {
  const rows = await getDb()
    .select({
      id: feedbackSubmissions.id,
      name: feedbackSubmissions.name,
      responsiveness: feedbackSubmissions.responsiveness,
      timeSpent: feedbackSubmissions.timeSpent,
      wouldRecommend: feedbackSubmissions.wouldRecommend,
      reportsProblem: feedbackSubmissions.reportsProblem,
      project: feedbackSubmissions.project,
      message: feedbackSubmissions.message,
      readAt: feedbackSubmissions.readAt,
      createdAt: feedbackSubmissions.createdAt,
    })
    .from(feedbackSubmissions)
    .where(project ? eq(feedbackSubmissions.project, project) : undefined)
    .orderBy(desc(feedbackSubmissions.createdAt));

  return rows.map((row) => ({
    ...row,
    readAt: asDate(row.readAt),
    createdAt: requiredDate(row.createdAt),
  }));
}

export async function getFeedback(id: string): Promise<Feedback | null> {
  if (!isUuid(id)) return null;
  const [row] = await getDb()
    .select({
      id: feedbackSubmissions.id,
      name: feedbackSubmissions.name,
      responsiveness: feedbackSubmissions.responsiveness,
      timeSpent: feedbackSubmissions.timeSpent,
      wouldRecommend: feedbackSubmissions.wouldRecommend,
      reportsProblem: feedbackSubmissions.reportsProblem,
      project: feedbackSubmissions.project,
      message: feedbackSubmissions.message,
      readAt: feedbackSubmissions.readAt,
      createdAt: feedbackSubmissions.createdAt,
    })
    .from(feedbackSubmissions)
    .where(eq(feedbackSubmissions.id, id))
    .limit(1);
  return row
    ? { ...row, readAt: asDate(row.readAt), createdAt: requiredDate(row.createdAt) }
    : null;
}

export async function markFeedbackRead(id: string): Promise<void> {
  if (!isUuid(id)) return;
  await getDb()
    .update(feedbackSubmissions)
    .set({ readAt: new Date() })
    .where(and(eq(feedbackSubmissions.id, id), isNull(feedbackSubmissions.readAt)));
}

export async function getInboxSummary(): Promise<ModuleSummary> {
  const db = getDb();
  const unreadProblem = and(eq(feedbackSubmissions.reportsProblem, true), isNull(feedbackSubmissions.readAt));
  const [newInquiries, unreadFeedback, recentInquiries, unreadProblems, [latestInquiry], [latestFeedback]] =
    await Promise.all([
      db.$count(projectInquiries, eq(projectInquiries.status, "new")),
      db.$count(feedbackSubmissions, isNull(feedbackSubmissions.readAt)),
      db.$count(projectInquiries, gte(projectInquiries.createdAt, thirtyDaysAgo)),
      db.$count(feedbackSubmissions, unreadProblem),
      db.select({ at: max(projectInquiries.createdAt) }).from(projectInquiries),
      db.select({ at: max(feedbackSubmissions.createdAt) }).from(feedbackSubmissions),
    ]);

  const updatedAt = [asDate(latestInquiry?.at ?? null), asDate(latestFeedback?.at ?? null)]
    .filter((date): date is Date => date !== null)
    .sort((a, b) => b.getTime() - a.getTime())[0] ?? null;

  let headline = "Inbox is clear";
  if (newInquiries > 0) {
    headline = newInquiries === 1 ? "1 new inquiry" : `${newInquiries} new inquiries`;
  } else if (unreadProblems > 0) {
    headline = unreadProblems === 1 ? "1 unread problem report" : `${unreadProblems} unread problem reports`;
  }

  return {
    id: "inbox",
    status: newInquiries > 0 || unreadProblems > 0 ? "attention" : "ok",
    headline,
    metrics: [
      { label: "New", value: String(newInquiries) },
      { label: "Unread feedback", value: String(unreadFeedback) },
      { label: "Inquiries, 30 days", value: String(recentInquiries) },
    ],
    updatedAt,
    href: "/dashboard/inbox",
  };
}

export async function getInboxSignals(): Promise<Signal[]> {
  const db = getDb();
  const [inquiries, problems] = await Promise.all([
    db
      .select({ id: projectInquiries.id, name: projectInquiries.name, createdAt: projectInquiries.createdAt })
      .from(projectInquiries)
      .where(gte(projectInquiries.createdAt, thirtyDaysAgo))
      .orderBy(desc(projectInquiries.createdAt)),
    db
      .select({
        id: feedbackSubmissions.id,
        project: feedbackSubmissions.project,
        createdAt: feedbackSubmissions.createdAt,
      })
      .from(feedbackSubmissions)
      .where(and(eq(feedbackSubmissions.reportsProblem, true), gte(feedbackSubmissions.createdAt, thirtyDaysAgo)))
      .orderBy(desc(feedbackSubmissions.createdAt)),
  ]);

  const inquirySignals: Signal[] = inquiries.flatMap((inquiry) => {
    const at = asDate(inquiry.createdAt);
    if (!at) return [];
    return [{ source: "inbox" as const, kind: "inquiry.created", severity: "info" as const, subject: inquiry.id, title: `Inquiry from ${inquiry.name}`, at }];
  });

  const problemSignals: Signal[] = problems.flatMap((problem) => {
    const at = asDate(problem.createdAt);
    if (!at) return [];
    return [{ source: "inbox" as const, kind: "feedback.problem", severity: "warn" as const, subject: problem.id, title: `Problem reported on ${problem.project}`, at }];
  });

  return [...inquirySignals, ...problemSignals];
}
