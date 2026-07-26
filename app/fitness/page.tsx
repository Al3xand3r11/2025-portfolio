import Link from "next/link";
import styles from "./fitness.module.css";

/* 24px blurred frame, inlined so the hero has colour before the photo lands */
const HERO_PLACEHOLDER =
  "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAADwAwCdASoYABAAPu1iqU2ppaOiMAgBMB2JbACdABukErztEEZgFVsAAPZ70ahj8wtP8jm/Xk+1iqplb08wxXeCUN1aUuvKbCWDtpbneqNmpTk9lcisWiWRHPqqFv1PEvvX/nTrDTb9AAAA";

/* phones get a centred vertical crop, everything else the full frame */
const PORTRAIT = "(max-aspect-ratio: 3 / 4)";

export default function FitnessLanding() {
  return (
    <main
      className={styles.hero}
      style={{ backgroundImage: `url("${HERO_PLACEHOLDER}")` }}
    >
      <picture>
        <source
          type="image/avif"
          media={PORTRAIT}
          sizes="100vw"
          srcSet="/lagree-hero-portrait-1080.avif 1080w, /lagree-hero-portrait-1620.avif 1620w"
        />
        <source
          type="image/webp"
          media={PORTRAIT}
          sizes="100vw"
          srcSet="/lagree-hero-portrait-1080.webp 1080w, /lagree-hero-portrait-1620.webp 1620w"
        />
        <source
          type="image/avif"
          sizes="100vw"
          srcSet="/lagree-hero-1440.avif 1440w, /lagree-hero-2160.avif 2160w, /lagree-hero-3200.avif 3200w"
        />
        <source
          type="image/webp"
          sizes="100vw"
          srcSet="/lagree-hero-1440.webp 1440w, /lagree-hero-2160.webp 2160w, /lagree-hero-3200.webp 3200w"
        />
        <img
          src="/lagree-hero-2160.webp"
          alt="Brandon Nance in the Lagree studio"
          className={styles.heroImage}
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* only the base is dimmed, so the wall and neon keep their colour */}
      <div className={styles.heroScrim} />

      <div className={styles.heroContent}>
        <p className={styles.heroLine}>
          Lagree instructor teaching Sundays, Mondays, Wednesdays, and Fridays.
        </p>
        <h1 className={styles.heroName}>Brandon Nance</h1>
        <Link href="/fitness/schedule" className={styles.heroCue}>
          Take a class
        </Link>
      </div>
    </main>
  );
}
