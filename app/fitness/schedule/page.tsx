import type { Metadata } from "next";
import styles from "../fitness.module.css";
import { ArrowIcon, PinIcon } from "../icons";
import { BOOKING_URL, weeklySchedule } from "../scheduleData";

export const metadata: Metadata = {
  title: "Class Schedule | Brandon Alexander Lagree",
  description:
    "Weekly Lagree class schedule with Brandon Alexander at Lagree213 — Arts District and Historic Core, downtown Los Angeles.",
};

const CLASS_TAGS = ["45 min", "Full body", "All levels"];

export default function SchedulePage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.eyebrow}>Weekly Schedule</h1>

      <div className={styles.sections}>
        {weeklySchedule.map((cls) => (
          <section key={cls.day} className={styles.section}>
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
              <ul className={styles.times}>
                {cls.times.map((t) => (
                  <li key={t.time}>
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
                  </li>
                ))}
              </ul>

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
          </section>
        ))}
      </div>

      <p className={styles.footNote}>
        Schedules shift week to week — check Mindbody for the latest.
      </p>
    </main>
  );
}
