import { getProcessSignals, getProcessSummary } from "../../lib/arena/service";
import { getInboxSignals, getInboxSummary } from "../../lib/contact/queries";
import { getProjectsSignals, getProjectsSummary } from "../../lib/health/service";
import type { ModuleSummary, Signal } from "../../lib/signals/types";
import MetricTile from "../_components/MetricTile";
import Panel from "../_components/Panel";
import Timeline from "../_components/Timeline";
import styles from "../dashboard.module.css";

async function settle<T>(load: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await load();
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

export default async function DashboardPage() {
  const [inbox, projects, process, inboxSignals, projectSignals, processSignals] = await Promise.all([
    settle<ModuleSummary | null>(getInboxSummary, null),
    settle<ModuleSummary | null>(getProjectsSummary, null),
    settle<ModuleSummary | null>(getProcessSummary, null),
    settle<Signal[]>(getInboxSignals, []),
    settle<Signal[]>(getProjectsSignals, []),
    settle<Signal[]>(getProcessSignals, []),
  ]);

  const signals = [...inboxSignals, ...projectSignals, ...processSignals]
    .sort((a, b) => b.at.getTime() - a.at.getTime())
    .slice(0, 20);

  return (
    <div className={styles.overview}>
      <div className={styles.tiles}>
        <MetricTile summary={inbox} />
        <MetricTile summary={projects} />
        <MetricTile summary={process} />
      </div>
      <Panel label="Activity">
        <Timeline signals={signals} />
      </Panel>
    </div>
  );
}
