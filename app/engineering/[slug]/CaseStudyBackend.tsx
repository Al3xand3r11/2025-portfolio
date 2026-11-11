import { FadeInView } from "../../components/MotionWrapper";
import type { CaseStudy } from "../../lib/caseStudies";
import MediaSlot from "./MediaSlot";
import styles from "./caseStudy.module.css";

export default function CaseStudyBackend({
  title,
  backend,
}: {
  title: string;
  backend: CaseStudy["backend"];
}) {
  return (
    <section className={styles.backend}>
      <FadeInView y={16}>
        <div className={styles.backendGrid}>
          <p className={styles.label}>Backend</p>
          <div>
            <p className={styles.blurb}>{backend.blurb}</p>
            <div className={styles.stack}>
              {backend.stack.map((item) => (
                <div key={item.label} className={styles.stackItem}>
                  <p className={styles.stackLabel}>{item.label}</p>
                  <p className={styles.stackValue}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <MediaSlot
          className={styles.backendShot}
          src={backend.image}
          alt={`${title} backend`}
          label="Backend screenshot"
          sizes="(max-width: 767px) 100vw, 90vw"
        />
      </FadeInView>
    </section>
  );
}
