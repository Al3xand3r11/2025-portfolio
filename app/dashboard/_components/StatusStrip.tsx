import styles from "../dashboard.module.css";

export type DayStatus = "ok" | "down" | "none";

const DAYS = 30;

/** One cell per day, oldest first. Missing days render as empty. */
export default function StatusStrip({ days }: { days: DayStatus[] }) {
  const cells = Array.from({ length: DAYS }, (_, index) => days[index] ?? "none");

  return (
    <div className={styles.strip} role="img" aria-label="Daily status for the last 30 days">
      {cells.map((day, index) => (
        <span key={index} className={styles.cell} data-status={day} />
      ))}
    </div>
  );
}
