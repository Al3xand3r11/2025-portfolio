import Link from "next/link";
import type { ModuleSummary } from "../../lib/signals/types";
import styles from "../dashboard.module.css";
import EmptyState from "./EmptyState";
import Panel from "./Panel";
import StatusDot from "./StatusDot";

const LABEL: Record<ModuleSummary["id"], string> = {
  inbox: "Inbox",
  projects: "Projects",
  process: "Process",
};

export default function MetricTile({ summary }: { summary: ModuleSummary | null }) {
  if (!summary) {
    return (
      <Panel>
        <EmptyState message="This source did not respond." />
      </Panel>
    );
  }

  return (
    <Panel
      label={LABEL[summary.id]}
      action={
        <Link href={summary.href} className={styles.kicker}>
          Open
        </Link>
      }
    >
      <div className={styles.statusLine}>
        <StatusDot status={summary.status} />
        <p className={styles.headline}>{summary.headline}</p>
      </div>
      {summary.metrics.length > 0 ? (
        <dl className={styles.metrics}>
          {summary.metrics.map((metric) => (
            <div key={metric.label} className={styles.metric}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </Panel>
  );
}
