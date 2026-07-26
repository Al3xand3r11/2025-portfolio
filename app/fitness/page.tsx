import Link from "next/link";
import { Settle, Stagger, StaggerItem } from "./Motion";
import styles from "./fitness.module.css";

/* 24px blurred frame, inlined so the hero has colour before the photo lands */
const HERO_PLACEHOLDER =
  "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAADwAwCdASoYABAAPu1iqU2ppaOiMAgBMB2JbACdABukErztEEZgFVsAAPZ70ahj8wtP8jm/Xk+1iqplb08wxXeCUN1aUuvKbCWDtpbneqNmpTk9lcisWiWRHPqqFv1PEvvX/nTrDTb9AAAA";

/* phones get a centred vertical crop, everything else the full frame */
const PORTRAIT = "(max-aspect-ratio: 3 / 4)";

/* the copy starts arriving as the entry curtain clears the top of the screen */
const AFTER_CURTAIN = 0.62;

export default function FitnessLanding() {
  return (
    <main
      className={styles.hero}
      style={{ backgroundImage: `url("${HERO_PLACEHOLDER}")` }}
    >
      <Settle className={styles.heroFrame} duration={2.2} from={1.07}>
        <picture>
          <source type="image/avif" media={PORTRAIT} sizes="100vw"
            srcSet="/lagree-hero-portrait-1080.avif 1080w, /lagree-hero-portrait-1620.avif 1620w" />
          <source type="image/webp" media={PORTRAIT} sizes="100vw"
            srcSet="/lagree-hero-portrait-1080.webp 1080w, /lagree-hero-portrait-1620.webp 1620w" />
          <source type="image/avif" sizes="100vw"
            srcSet="/lagree-hero-1440.avif 1440w, /lagree-hero-2160.avif 2160w, /lagree-hero-3200.avif 3200w" />
          <source type="image/webp" sizes="100vw"
            srcSet="/lagree-hero-1440.webp 1440w, /lagree-hero-2160.webp 2160w, /lagree-hero-3200.webp 3200w" />
          <img
            src="/lagree-hero-2160.webp"
            alt="Brandon Nance in the Lagree studio"
            className={styles.heroImage}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </Settle>

      <div className={styles.heroScrim} />

      <Stagger
        className={styles.heroContent}
        delay={AFTER_CURTAIN}
        stagger={0.12}
      >
        <StaggerItem as="p" className={styles.heroLine} y={16}>
          Lagree instructor teaching Sundays, Mondays, Wednesdays, and Fridays.
        </StaggerItem>

        <StaggerItem as="h1" className={styles.heroName} y={30} duration={0.85}>
          Brandon Nance
        </StaggerItem>

        <StaggerItem y={14}>
          <Link href="/schedule" className={styles.heroCue}>
            Take a class
          </Link>
        </StaggerItem>
      </Stagger>
    </main>
  );
}
