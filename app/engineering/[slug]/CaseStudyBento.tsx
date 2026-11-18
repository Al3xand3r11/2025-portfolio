import { FadeInView } from "../../components/MotionWrapper";
import BentoVideo from "./BentoVideo";
import MediaSlot from "./MediaSlot";
import styles from "./caseStudy.module.css";

const PAIR = [
  { label: "Bento image 1" },
  { label: "Bento image 2" },
] as const;

export default function CaseStudyBento({
  title,
  video,
  images,
}: {
  title: string;
  video: string;
  images: string[];
}) {
  return (
    <section className={styles.bentoSection}>
      <FadeInView y={16}>
        <div className={styles.bento}>
          <div className={styles.videoRow}>
            <div className={`${styles.slot} ${styles.videoTile}`}>
              <BentoVideo video={video} title={title} />
            </div>
          </div>
          <div className={styles.pair}>
            {PAIR.map((shot, i) => (
              <MediaSlot
                key={shot.label}
                className={styles.pairShot}
                src={images[i] ?? ""}
                alt={`${title} ${shot.label.toLowerCase()}`}
                label={shot.label}
                sizes="(max-width: 767px) 100vw, 45vw"
              />
            ))}
          </div>
          <MediaSlot
            className={styles.fullShot}
            src={images[2] ?? ""}
            alt={`${title} bento image 3`}
            label="Bento image 3"
            sizes="(max-width: 767px) 100vw, 90vw"
          />
        </div>
      </FadeInView>
    </section>
  );
}
