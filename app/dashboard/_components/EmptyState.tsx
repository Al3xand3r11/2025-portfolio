import styles from "../dashboard.module.css";

export default function EmptyState({ message }: { message: string }) {
  return <p className={styles.empty}>{message}</p>;
}
