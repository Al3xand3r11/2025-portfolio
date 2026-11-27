import { desc, eq } from "drizzle-orm";
import { getDb } from "../db";
import { feedbackSubmissions, healthChecks } from "../db/schema";
import type { ModuleStatus, ModuleSummary, Signal } from "../signals/types";
import { httpCheck, type Check, type CheckResult } from "./checks";
import { HEALTH_TARGETS, type Target } from "./targets";

type DayStatus = "ok" | "down" | "none";

const CHECKS: Check[] = [httpCheck];
const SLOW_MS = 3000;
const HISTORY_LIMIT = 500;

export type ProjectHealth = {
  slug: string;
  title: string;
  url: string;
  status: ModuleStatus;
  lastChecked: Date | null;
  latencyMs: number | null;
  detail: string | null;
  latestOk: boolean | null;
  previousOk: boolean | null;
  daysHealthy: number;
  strip: DayStatus[];
  latencies: number[];
  problem: { message: string | null; at: Date } | null;
};

type CheckRow = {
  projectSlug: string;
  ok: boolean;
  latencyMs: number | null;
  detail: string | null;
  checkedAt: Date;
};

type ProblemRow = {
  project: string;
  message: string | null;
  createdAt: Date;
};

function asDate(value: Date | string | null): Date | null {
  if (value == null) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function recentDayKeys(): string[] {
  const today = new Date();
  return Array.from({ length: 30 }, (_, index) => {
    const day = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - (29 - index)));
    return day.toISOString().slice(0, 10);
  });
}

function namesFor(target: Target): Set<string> {
  const host = new URL(target.url).hostname.replace(/^www\./, "");
  return new Set([target.title, target.slug, host, target.url].map((name) => name.toLowerCase()));
}

function problemFor(target: Target, problems: ProblemRow[]): ProblemRow | null {
  const names = namesFor(target);
  return problems.find((problem) => names.has(problem.project.trim().toLowerCase())) ?? null;
}

function statusOf(latest: CheckRow | undefined, problem: ProblemRow | null): ModuleStatus {
  if (!latest) return "unknown";
  if (!latest.ok) return "down";
  if (problem && problem.createdAt > latest.checkedAt) return "attention";
  return "ok";
}

export async function runChecks(trigger: "cron" | "manual"): Promise<void> {
  const jobs = HEALTH_TARGETS.flatMap((target) => CHECKS.map((check) => ({ target, check })));
  const settled = await Promise.allSettled(
    jobs.map(async ({ target, check }) => ({ target, check, result: await check.run(target) }))
  );

  const values = settled.map((outcome, index) => {
    const job = jobs[index];
    const result: CheckResult =
      outcome.status === "fulfilled"
        ? outcome.value.result
        : { ok: false, statusCode: null, latencyMs: null, detail: "Check failed" };
    return {
      projectSlug: job.target.slug,
      checkId: job.check.id,
      ok: result.ok,
      statusCode: result.statusCode,
      latencyMs: result.latencyMs,
      detail: result.detail,
      trigger,
    };
  });

  if (values.length > 0) await getDb().insert(healthChecks).values(values);
}

export async function getProjectHealth(): Promise<ProjectHealth[]> {
  const db = getDb();
  const [checks, problems] = await Promise.all([
    db
      .select({
        projectSlug: healthChecks.projectSlug,
        ok: healthChecks.ok,
        latencyMs: healthChecks.latencyMs,
        detail: healthChecks.detail,
        checkedAt: healthChecks.checkedAt,
      })
      .from(healthChecks)
      .orderBy(desc(healthChecks.checkedAt))
      .limit(HISTORY_LIMIT),
    db
      .select({
        project: feedbackSubmissions.project,
        message: feedbackSubmissions.message,
        createdAt: feedbackSubmissions.createdAt,
      })
      .from(feedbackSubmissions)
      .where(eq(feedbackSubmissions.reportsProblem, true))
      .orderBy(desc(feedbackSubmissions.createdAt)),
  ]);

  const rows: CheckRow[] = checks.flatMap((check) => {
    const checkedAt = asDate(check.checkedAt);
    return checkedAt ? [{ ...check, checkedAt }] : [];
  });
  const problemRows: ProblemRow[] = problems.flatMap((problem) => {
    const createdAt = asDate(problem.createdAt);
    return createdAt ? [{ ...problem, createdAt }] : [];
  });
  const days = recentDayKeys();
  const daySet = new Set(days);

  return HEALTH_TARGETS.map((target) => {
    const history = rows.filter((row) => row.projectSlug === target.slug);
    const latest = history[0];
    const problem = problemFor(target, problemRows);
    const strip = days.map((day) => {
      const check = history.find((row) => dayKey(row.checkedAt) === day);
      if (!check) return "none" as const;
      return check.ok ? ("ok" as const) : ("down" as const);
    });
    const latencies = history
      .filter((row) => daySet.has(dayKey(row.checkedAt)) && row.latencyMs != null)
      .map((row) => row.latencyMs as number)
      .reverse();

    return {
      slug: target.slug,
      title: target.title,
      url: target.url,
      status: statusOf(latest, problem),
      lastChecked: latest?.checkedAt ?? null,
      latencyMs: latest?.latencyMs ?? null,
      detail: latest?.detail ?? null,
      latestOk: latest?.ok ?? null,
      previousOk: history[1]?.ok ?? null,
      daysHealthy: strip.filter((day) => day === "ok").length,
      strip,
      latencies,
      problem: problem ? { message: problem.message, at: problem.createdAt } : null,
    };
  });
}

export async function getProjectsSummary(): Promise<ModuleSummary> {
  const projects = await getProjectHealth();
  const down = projects.filter((project) => project.status === "down").length;
  const attention = projects.filter((project) => project.status === "attention").length;
  const up = projects.filter((project) => project.status === "ok").length;
  const updatedAt = projects
    .map((project) => project.lastChecked)
    .filter((date): date is Date => date !== null)
    .sort((a, b) => b.getTime() - a.getTime())[0] ?? null;

  let status: ModuleStatus = "ok";
  let headline = "All systems operational";
  if (projects.every((project) => project.status === "unknown")) {
    status = "unknown";
    headline = "No checks yet";
  } else if (down > 0) {
    status = "down";
    headline = down === 1 ? "1 site down" : `${down} sites down`;
  } else if (attention > 0) {
    status = "attention";
    headline = attention === 1 ? "1 site needs attention" : `${attention} sites need attention`;
  }

  return {
    id: "projects",
    status,
    headline,
    metrics: [
      { label: "Up", value: String(up) },
      { label: "Down", value: String(down) },
      { label: "Attention", value: String(attention) },
    ],
    updatedAt,
    href: "/dashboard/projects",
  };
}

export async function getProjectsSignals(): Promise<Signal[]> {
  const projects = await getProjectHealth();
  return projects.flatMap((project) => {
    if (!project.lastChecked) return [];
    const signals: Signal[] = [];
    const base = { source: "projects" as const, subject: project.slug, at: project.lastChecked };

    if (project.latestOk === false && project.previousOk !== false) {
      signals.push({ ...base, kind: "site.down", severity: "critical", title: `${project.title} is down` });
    } else if (project.latestOk === true && project.previousOk === false) {
      signals.push({ ...base, kind: "site.recovered", severity: "info", title: `${project.title} recovered` });
    }

    if (project.latestOk === true && project.latencyMs != null && project.latencyMs > SLOW_MS) {
      signals.push({
        ...base,
        kind: "site.slow",
        severity: "warn",
        title: `${project.title} responded in ${project.latencyMs} ms`,
      });
    }

    return signals;
  });
}
