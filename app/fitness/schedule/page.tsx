import type { Metadata } from "next";
import { Reveal, Stagger, StaggerItem } from "../Motion";
import styles from "../fitness.module.css";
import { ArrowIcon, PinIcon } from "../icons";
import { BOOKING_URL, weeklySchedule } from "../scheduleData";

export const metadata: Metadata = {
  title: "Class Schedule | Brandon Nance Lagree",
  description:
    "Weekly Lagree class schedule with Brandon Nance at Lagree213 — Arts District and Historic Core, downtown Los Angeles.",
  alternates: { canonical: "/schedule" },
};

const CLASS_TAGS = ["45 min", "Full body", "All levels"];

export default function SchedulePage() {
  return (
    <main className={styles.page}>
      <Reveal as="h1" className={styles.eyebrow} y={12} duration={0.6}>
        Weekly Schedule
      </Reveal>

      <div className={styles.sections}>
        {weeklySchedule.map((cls) => (
          <Reveal
            as="section"
            key={cls.day}
            className={styles.section}
            inView
            y={34}
            duration={0.75}
          >
            <div className={styles.sectionMeta}>
              <div className={styles.tags}>
                {CLASS_TAGS.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sectionAction}
              >
                Book a class
                <ArrowIcon />
              </a>
            </div>

            <h2 className={styles.sectionTitle}>
              <span className={styles.titleStrong}>{cls.day}</span>{" "}
              <span className={styles.titleSoft}>{cls.locationName}</span>
            </h2>

            <div className={styles.sectionBand}>
              <Stagger as="ul" className={styles.times} inView stagger={0.07}>
                {cls.times.map((t) => (
                  <StaggerItem as="li" key={t.time} y={16}>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.timeChip}
                    >
                      <span className={styles.timeChipTime}>{t.time}</span>
                      <span className={styles.timeChipMeta}>
                        {t.label ?? "Book"}
                      </span>
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>

              <a
                href={cls.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                <PinIcon />
                {cls.address}
                <ArrowIcon />
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal as="p" className={styles.footNote} inView y={16} duration={0.6}>
        Schedules shift week to week — check Mindbody for the latest.
      </Reveal>
    </main>
  );
}
