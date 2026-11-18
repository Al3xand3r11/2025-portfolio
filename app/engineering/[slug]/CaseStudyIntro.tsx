import { FadeIn } from "../../components/MotionWrapper";
import MediaSlot from "./MediaSlot";
import styles from "./caseStudy.module.css";

export default function CaseStudyIntro({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <section className={styles.lead}>
      <FadeIn y={16}>
        <div className={styles.head}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <MediaSlot
          className={styles.heroShot}
          src={image}
          alt={title}
          label="Hero image"
          priority
          parallax
          sizes="(max-width: 767px) 100vw, 90vw"
        />
      </FadeIn>
    </section>
  );
}
