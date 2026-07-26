import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "../Motion";
import styles from "../fitness.module.css";

export const metadata: Metadata = {
  title: "About | Brandon Nance Lagree",
  description:
    "How Brandon Nance found Lagree after his first marathon, and why he teaches it in downtown Los Angeles.",
  alternates: { canonical: "/about" },
};

/* the two columns arrive from the edges they sit against, once the entry
   curtain has cleared the screen */
const AFTER_CURTAIN = 0.6;

export default function AboutPage() {
  return (
    <main className={styles.about}>
      <Reveal
        className={styles.aboutImageFrame}
        delay={AFTER_CURTAIN}
        duration={1}
        x={-56}
        y={0}
      >
        <Image
          src="/lagree-about.webp"
          alt="Brandon Nance"
          width={1200}
          height={1800}
          sizes="(max-width: 900px) 70vw, 40vw"
          priority
          className={styles.aboutImage}
        />
      </Reveal>

      <Stagger
        className={styles.aboutCopy}
        delay={AFTER_CURTAIN + 0.14}
        stagger={0.11}
      >
        <StaggerItem as="h1" className={styles.aboutLabel} y={0} x={28}>
          About
        </StaggerItem>

        <StaggerItem as="p" className={styles.aboutText} y={0} x={28}>
          I was first introduced to Lagree a few months after my first marathon.
          Searching for a workout that was easy on my joints, effective and
          still difficult enough to strengthen my muscles and increase my speed.
        </StaggerItem>

        <StaggerItem as="p" className={styles.aboutText} y={0} x={28}>
          After taking Lagree daily for a year I decided to take the leap and
          get certified with the goal of introducing more to the benefits of
          Lagree while sharing my favorite songs on a weekly basis. Overall,
          Lagree has changed my life mentally and physically pushing me past my
          perceived limits.
        </StaggerItem>
      </Stagger>

      <Reveal
        as="footer"
        className={styles.aboutFooter}
        delay={AFTER_CURTAIN + 0.42}
        y={14}
      >
        <Link href="/schedule" className={styles.aboutFooterLink}>
          Take a class
        </Link>
      </Reveal>
    </main>
  );
}
