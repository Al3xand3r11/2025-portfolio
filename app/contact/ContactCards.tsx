"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { GITHUB_LOGIN, type ContributionDay, type GitHubActivity } from "../lib/github";
import styles from "./contact.module.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/bnance1/";
const GITHUB_URL = `https://github.com/${GITHUB_LOGIN}`;

const LEVEL_FILL = [6, 25, 45, 70, 100].map(
  (pct) => `color-mix(in srgb, var(--page-fg) ${pct}%, transparent)`
);

const card: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  borderRadius: 12,
  backgroundColor: "var(--page-surface)",
  textAlign: "left",
  overflow: "hidden",
};

const eyebrow: CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontFamily: "var(--font-mono)",
  color: "var(--page-muted)",
};

const pill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  alignSelf: "flex-start",
  padding: "10px 18px",
  borderRadius: 999,
  fontSize: 14,
  fontFamily: "var(--font-display)",
  textDecoration: "none",
  whiteSpace: "nowrap",
  transition: "opacity 0.2s",
};

const hover = {
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.opacity = "0.7"),
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.opacity = "1"),
};

/* Fixed time zones keep server and client renders identical. */
const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const eventFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "America/Los_Angeles",
});

export default function ContactCards({ github }: { github?: GitHubActivity }) {
  return (
    <div className={styles.cards}>
      <GitHubCard activity={github ?? { calendar: null, events: [] }} />
      <LinkedInCard />
    </div>
  );
}

function GitHubCard({ activity }: { activity: GitHubActivity }) {
  const { calendar, events } = activity;
  const [hovered, setHovered] = useState<ContributionDay | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  return (
    <article style={{ ...card, padding: 24, gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
        <p style={eyebrow}>GitHub activity</p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...eyebrow, color: "var(--page-fg)", textDecoration: "none", transition: "opacity 0.2s" }}
          {...hover}
        >
          @{GITHUB_LOGIN} ↗
        </a>
      </div>

      {calendar && (
        <div>
          <div ref={scrollRef} style={{ overflowX: "auto", paddingBottom: 4 }}>
            <div
              style={{ display: "flex", gap: 3, width: "max-content" }}
              onMouseLeave={() => setHovered(null)}
            >
              {calendar.weeks.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {week.map((day) => (
                    <span
                      key={day.date}
                      title={`${day.count} on ${dayFormat.format(new Date(day.date))}`}
                      onMouseEnter={() => setHovered(day)}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        backgroundColor: LEVEL_FILL[day.level],
                        outline: hovered?.date === day.date ? "1px solid var(--page-fg)" : "none",
                        outlineOffset: 1,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p style={{ ...eyebrow, marginTop: 12, textTransform: "none", letterSpacing: 0, fontSize: 12 }}>
            {hovered
              ? `${hovered.count} contribution${hovered.count === 1 ? "" : "s"} on ${dayFormat.format(new Date(hovered.date))}`
              : `${calendar.total.toLocaleString("en-US")} contributions in the last year`}
          </p>
        </div>
      )}

      {events.length > 0 ? (
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
          {events.map((event) => (
            <li key={event.id}>
              <a
                href={`${GITHUB_URL}/${event.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 16,
                  padding: "12px 0",
                  borderTop: "1px solid color-mix(in srgb, var(--page-fg) 10%, transparent)",
                  color: "var(--page-fg)",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                {...hover}
              >
                <span style={{ minWidth: 0, fontSize: 14, fontFamily: "var(--font-display)" }}>
                  {event.summary}{" "}
                  <span style={{ color: "var(--page-muted)" }}>· {event.repo}</span>
                </span>
                <span style={{ ...eyebrow, flexShrink: 0 }}>
                  {eventFormat.format(new Date(event.createdAt))}
                </span>
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <p style={{ margin: 0, fontSize: 13, color: "var(--page-body)" }}>
          No recent public activity.
        </p>
      )}
    </article>
  );
}

function LinkedInCard() {
  return (
    <article style={card}>
      <div
        aria-hidden
        style={{
          height: 72,
          background:
            "linear-gradient(120deg, color-mix(in srgb, var(--page-fg) 14%, transparent), color-mix(in srgb, var(--page-fg) 4%, transparent))",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "0 24px 24px" }}>
        <div
          style={{
            position: "relative",
            width: 88,
            height: 88,
            marginTop: -44,
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid var(--page-surface)",
          }}
        >
          <Image
            src="/images/bheadshot.webp"
            alt="Brandon Nance"
            fill
            sizes="88px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 22, fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
            Brandon Nance
          </p>
          <p style={{ margin: "6px 0 0", fontSize: 14, fontFamily: "var(--font-display)", color: "var(--page-body)" }}>
            Software Engineer at Paramount
          </p>
          <p style={{ ...eyebrow, marginTop: 10 }}>Los Angeles, California</p>
        </div>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...pill, color: "var(--page-bg)", backgroundColor: "var(--page-fg)" }}
          {...hover}
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Connect
        </a>
      </div>
    </article>
  );
}
