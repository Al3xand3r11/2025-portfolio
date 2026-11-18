import { FadeInView } from "../../components/MotionWrapper";
import styles from "./caseStudy.module.css";

export default function CaseStudyStatement({
  intro,
  details,
}: {
  intro: string;
  details: [string, string, string];
}) {
  return (
    <section className={styles.statement}>
      <FadeInView y={16}>
        <p className={styles.intro}>{intro}</p>
        <div className={styles.columns}>
          <p className={styles.label}>Overview</p>
          <div className={styles.details}>
            {details.map((paragraph, i) => (
              <FadeInView key={i} y={16} delay={0.08 * (i + 1)}>
                <p className={styles.detail}>{paragraph}</p>
              </FadeInView>
            ))}
          </div>
        </div>
      </FadeInView>
    </section>
  );
}
