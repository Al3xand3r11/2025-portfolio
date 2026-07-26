import Link from "next/link";
import { Reveal } from "./Motion";
import styles from "./fitness.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <Reveal as="h1" className={styles.eyebrow} y={12} duration={0.6}>
        Page not found
      </Reveal>

      <Reveal className={styles.notFound} delay={0.1}>
        <p className={styles.notFoundText}>
          That page has moved or never existed.
        </p>

        <Link href="/schedule" className={styles.sectionAction}>
          See the schedule
        </Link>
      </Reveal>
    </main>
  );
}
