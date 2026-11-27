import styles from "../dashboard.module.css";

export default function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null;

  const width = 96;
  const height = 28;
  const min = Math.min(...values);
  const span = Math.max(...values) - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 2) - 1;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className={styles.spark} width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
