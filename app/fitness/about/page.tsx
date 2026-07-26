import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../fitness.module.css";

export const metadata: Metadata = {
  title: "About | Brandon Nance Lagree",
  description:
    "How Brandon Nance found Lagree after his first marathon, and why he teaches it in downtown Los Angeles.",
};

export default function AboutPage() {
  return (
    <main className={styles.about}>
      <Image
        src="/lagree-about.webp"
        alt="Brandon Nance"
        width={1200}
        height={1800}
        sizes="(max-width: 900px) 70vw, 40vw"
        priority
        className={styles.aboutImage}
      />

      <div className={styles.aboutCopy}>
        <h1 className={styles.aboutLabel}>About</h1>

        <p className={styles.aboutText}>
          I was first introduced to Lagree a few months after my first marathon.
          Searching for a workout that was easy on my joints, effective and
          still difficult enough to strengthen my muscles and increase my speed.
        </p>

        <p className={styles.aboutText}>
          After taking Lagree daily for a year I decided to take the leap and
          get certified with the goal of introducing more to the benefits of
          Lagree while sharing my favorite songs on a weekly basis. Overall,
          Lagree has changed my life mentally and physically pushing me past my
          perceived limits.
        </p>
      </div>

      <footer className={styles.aboutFooter}>
        <Link href="/fitness/schedule" className={styles.aboutFooterLink}>
          Take a class
        </Link>
      </footer>
    </main>
  );
}
