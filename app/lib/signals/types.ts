export type ModuleId = "inbox" | "projects" | "process";

export type ModuleStatus = "ok" | "attention" | "down" | "unknown";

export type ModuleSummary = {
  id: ModuleId;
  status: ModuleStatus;
  headline: string;
  metrics: { label: string; value: string }[];
  updatedAt: Date | null;
  href: string;
};

export type Signal = {
  source: ModuleId;
  kind: string;
  severity: "info" | "warn" | "critical";
  subject: string;
  title: string;
  at: Date;
};

export function unknownSummary(id: ModuleId, headline: string, href: string): ModuleSummary {
  return { id, status: "unknown", headline, metrics: [], updatedAt: null, href };
}
