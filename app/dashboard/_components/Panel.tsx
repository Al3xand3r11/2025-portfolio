import type { ReactNode } from "react";
import styles from "../dashboard.module.css";

export default function Panel({
  label,
  action,
  children,
}: {
  label?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={styles.panel}>
      {label || action ? (
        <header className={styles.panelHeader}>
          {label ? <h2 className={styles.kicker}>{label}</h2> : <span />}
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}
