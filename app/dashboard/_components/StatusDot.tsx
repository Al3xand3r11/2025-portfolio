import type { ModuleStatus } from "../../lib/signals/types";
import styles from "../dashboard.module.css";

const LABEL: Record<ModuleStatus, string> = {
  ok: "Healthy",
  attention: "Needs attention",
  down: "Down",
  unknown: "Unknown",
};

export default function StatusDot({ status }: { status: ModuleStatus }) {
  return <span className={styles.dot} data-status={status} role="img" aria-label={LABEL[status]} />;
}
