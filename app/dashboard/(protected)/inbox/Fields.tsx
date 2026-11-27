import styles from "../../dashboard.module.css";

export default function Fields({ items }: { items: { label: string; value: string | null }[] }) {
  return (
    <dl className={styles.fields}>
      {items.map((item) => (
        <div key={item.label} className={styles.metric}>
          <dt>{item.label}</dt>
          <dd>{item.value && item.value.trim() !== "" ? item.value : "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
