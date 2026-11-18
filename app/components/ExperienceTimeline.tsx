"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Entry = {
  title: string;
  org: string;
  dates: string;
  bullets: string[];
};

type Track = {
  id: string;
  label: string;
  entries: Entry[];
};

const TRACKS: Track[] = [
  {
    id: "engineering",
    label: "Engineering",
    entries: [
      {
        title: "Software Engineer",
        org: "Paramount",
        dates: "2024 — Present",
        bullets: [
          "Designed and shipped the NestJS/TypeScript backend for an internal live-streaming operations tool used by 400+ employees across 5 teams; owned it in production for 3+ years at 99.9% uptime.",
          "Built role-based authorization with Keycloak: administering dozens of roles across channels, teams, and settings, with a self-service permissions dashboard that let managers administer their own team access and cut access-related bottlenecks 70%.",
          "Architected the data model and workflow system for user preferences, metrics, and streaming insights, persisted across devices; doubled internal active users in 6 months.",
          "Delivered UFC integration components within 37 days of acquisition approval, ensuring seamless platform launch for Paramount\u2019s first UFC event and reaching 7M+ households globally.",
          "Set up production-parity local development with Tilt, Docker, and Kubernetes, coupled with documentation and video walkthroughs reducing onboarding time for new engineers from 4 days to 1.",
        ],
      },
      {
        title: "Associate Software Engineer",
        org: "Paramount",
        dates: "2022 — 2024",
        bullets: [
          "Expanded scope from front end to full stack by leading sprint sessions, code reviews, and end-to-end build processes; architected and shipped backend service for a critical internal live streaming tool.",
          "Architected a database and workflow system integrating user preferences, analytical metrics, and live streaming insights; enabled media professionals to access, edit, and persist settings across devices, doubling internal service users within 6 months.",
          "Engineered ad insertion and live streaming technology for Super Bowl LVIII on Paramount+, supporting 120M+ total viewers.",
        ],
      },
    ],
  },
  {
    id: "customer-service",
    label: "Customer Service",
    entries: [
      {
        title: "On Point Specialist",
        org: "Apple",
        dates: "2021 — 2022",
        bullets: [
          "Personally checked in and triaged over 300 customer appointments a day at the store entrance on an iPad, working out each person\u2019s need within 30 seconds.",
          "Fixed device issues on the spot when I could, which cut wait times, freed up Genius Bar appointments for more complex repairs and got customers back to their day faster.",
          "Kept the front of the store moving at high volume by looking up pending appointments and booking future visits for device purchases and repairs.",
        ],
      },
      {
        title: "Running Footwear Specialist",
        org: "Nike",
        dates: "2020 — 2022",
        bullets: [
          "Matched runners to the right shoes based on their gait, training goals and terrain, and featured the current running lineup to drive sales of new and key products.",
          "Ordered running footwear in quantities planned around the season and what customers needed, so the right sizes and styles were in stock without excess inventory.",
          "Raised employee enrollment in the company benefits from 40% to 83% by holding one-on-one sessions with coworkers to explain their options and walk them through signing up.",
        ],
      },
    ],
  },
  {
    id: "fitness",
    label: "Fitness",
    entries: [
      {
        title: "Lagree Certified Instructor",
        org: "Lagree 213",
        dates: "2026 — Present",
        bullets: [
          "Create balanced and challenging routines for all levels of fitness focused on time under tension and stability.",
          "Curate unique hourly and daily 45 min playlists to accompany the routines and their intensity points.",
          "Achieve level 2 certification focused on more intricate and nuanced movements with an emphasis on safety and stability.",
        ],
      },
      {
        title: "Front Desk Concierge",
        org: "Lagree 213",
        dates: "2025 — 2026",
        bullets: [
          "Cultivate relationships with clients to establish and progress through strength training goals.",
          "Advise on membership and class recommendations for clients based on their weekly schedule and long term fitness goals.",
          "Participate in city wide volunteer initiatives and activations.",
        ],
      },
      {
        title: "Running Community Ambassador",
        org: "Nike",
        dates: "2024 — 2026",
        bullets: [
          "Participate in and assist in facilitating Nike events in Los Angeles on a weekly basis ranging from 20 members to 5,000 for a given event.",
          "Advise and mentor distance runners on hydration, body awareness and recovery for half marathons and marathons.",
          "Strategize operations for large scale shoe trialing and giveaways in crowded city environments with minimal support.",
        ],
      },
    ],
  },
];

const DOT = 13;
const RAIL_X = 6;

export default function ExperienceTimeline({ isMobile }: { isMobile: boolean }) {
  const reduceMotion = useReducedMotion();
  const [trackId, setTrackId] = useState(TRACKS[0].id);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const track = TRACKS.find((t) => t.id === trackId) ?? TRACKS[0];

  const selectTrack = (id: string) => {
    setTrackId(id);
    setOpenIndex(0);
  };

  return (
    <div style={{ width: "100%", maxWidth: 760 }}>
      <div
        role="tablist"
        aria-label="Experience"
        style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
      >
        {TRACKS.map((t) => {
          const active = t.id === trackId;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              aria-controls={`timeline-${t.id}`}
              onClick={() => selectTrack(t.id)}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontFamily: "var(--font-mono)",
                color: active ? "var(--page-bg)" : "var(--page-muted)",
                backgroundColor: active ? "var(--page-fg)" : "var(--page-surface)",
                transition: "background-color 0.25s, color 0.25s",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        id={`timeline-${track.id}`}
        role="tabpanel"
        style={{
          position: "relative",
          marginTop: isMobile ? 32 : 40,
          paddingLeft: isMobile ? 28 : 36,
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: RAIL_X,
            top: 8,
            bottom: 8,
            width: 1,
            backgroundColor: "var(--page-muted-2)",
            opacity: 0.6,
          }}
        />

        <AnimatePresence mode="wait">
          <motion.ol
            key={track.id}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {track.entries.map((entry, i) => {
              const open = openIndex === i;
              return (
                <li key={entry.title}>
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 0",
                      color: open ? "var(--page-fg)" : "var(--page-muted)",
                      transition: "color 0.25s",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: 16,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          fontFamily: "var(--font-mono)",
                          color: "var(--page-muted)",
                        }}
                      >
                        {entry.dates}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          fontFamily: "var(--font-mono)",
                          color: "var(--page-muted)",
                          textAlign: "right",
                        }}
                      >
                        {entry.org}
                      </span>
                    </div>
                    <p
                      style={{
                        position: "relative",
                        margin: "6px 0 0",
                        fontSize: isMobile ? 20 : 24,
                        fontWeight: 400,
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          left: -(isMobile ? 28 : 36) + RAIL_X - (DOT - 1) / 2,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: DOT,
                          height: DOT,
                          borderRadius: "50%",
                          boxSizing: "border-box",
                          border: `1.5px solid ${open ? "var(--page-fg)" : "var(--page-muted-2)"}`,
                          backgroundColor: open ? "var(--page-fg)" : "var(--page-bg)",
                          transition: "background-color 0.25s, border-color 0.25s",
                        }}
                      />
                      {entry.title}
                    </p>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <ul
                            style={{
                              margin: 0,
                              padding: "14px 0 0 18px",
                              fontSize: 13,
                              lineHeight: 1.8,
                              maxWidth: "60ch",
                              fontFamily: "var(--font-mono)",
                              color: "var(--page-body)",
                              display: "flex",
                              flexDirection: "column",
                              gap: 10,
                            }}
                          >
                            {entry.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </motion.ol>
        </AnimatePresence>
      </div>
    </div>
  );
}
