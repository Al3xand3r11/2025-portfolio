import type { ModuleStatus, Signal } from "../../lib/signals/types";
import styles from "../dashboard.module.css";
import { formatStamp } from "../format";
import EmptyState from "./EmptyState";
import StatusDot from "./StatusDot";

const DOT: Record<Signal["severity"], ModuleStatus> = {
  info: "unknown",
  warn: "attention",
  critical: "down",
};

const SOURCE: Record<Signal["source"], string> = {
  inbox: "Inbox",
  projects: "Projects",
  process: "Process",
};

export default function Timeline({ signals }: { signals: Signal[] }) {
  if (signals.length === 0) return <EmptyState message="No activity yet." />;

  return (
    <ol className={styles.timeline}>
      {signals.map((signal) => (
        <li
          key={`${signal.source}-${signal.kind}-${signal.subject}-${signal.at.toISOString()}`}
          className={styles.timelineItem}
        >
          <StatusDot status={DOT[signal.severity]} />
          <div>
            <p>{signal.title}</p>
            <p className={styles.meta}>
              {SOURCE[signal.source]} · {formatStamp(signal.at)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
