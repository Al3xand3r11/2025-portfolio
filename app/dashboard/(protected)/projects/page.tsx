import { getProjectHealth } from "../../../lib/health/service";
import Panel from "../../_components/Panel";
import Sparkline from "../../_components/Sparkline";
import StatusDot from "../../_components/StatusDot";
import StatusStrip from "../../_components/StatusStrip";
import styles from "../../dashboard.module.css";
import { formatStamp } from "../../format";
import CheckNow from "./CheckNow";

function headline(status: string, detail: string | null): string {
  if (status === "unknown") return "No checks yet";
  if (status === "down") return detail ?? "Down";
  if (status === "attention") return "Up, with a new problem report";
  return "Operational";
}

export default async function ProjectsPage() {
  const projects = await getProjectHealth();

  return (
    <div className={styles.stack}>
      <CheckNow />
      {projects.map((project) => (
        <Panel
          key={project.slug}
          label={project.title}
          action={
            <a href={project.url} className={styles.kicker} target="_blank" rel="noopener noreferrer">
              Visit
            </a>
          }
        >
          <div className={styles.statusLine}>
            <StatusDot status={project.status} />
            <p className={styles.headline}>{headline(project.status, project.detail)}</p>
          </div>
          <p className={styles.meta}>
            {project.daysHealthy} of 30 days healthy
            {project.lastChecked ? ` · Checked ${formatStamp(project.lastChecked)}` : ""}
            {project.latencyMs != null ? ` · ${project.latencyMs} ms` : ""}
          </p>
          <StatusStrip days={project.strip} />
          <Sparkline values={project.latencies} />
          {project.problem ? (
            <p className={styles.message}>
              Problem reported {formatStamp(project.problem.at)}
              {project.problem.message ? `. ${project.problem.message}` : ""}
            </p>
          ) : null}
        </Panel>
      ))}
    </div>
  );
}
