"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

type Entry = {
  title: string;
  org: string;
  dates: string;
  description: string;
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
      { title: "Software Engineer", org: "Lorem Studio", dates: "2024 — Present", description: LOREM },
      { title: "Frontend Developer", org: "Ipsum Labs", dates: "2023 — 2024", description: LOREM },
      { title: "Engineering Intern", org: "Dolor Systems", dates: "2021 — 2022", description: LOREM },
    ],
  },
  {
    id: "customer-service",
    label: "Customer Service",
    entries: [
      { title: "Community Ambassador", org: "Lorem Collective", dates: "2023 — Present", description: LOREM },
      { title: "Client Experience Lead", org: "Ipsum & Co.", dates: "2022 — 2023", description: LOREM },
      { title: "Customer Associate", org: "Dolor Retail", dates: "2019 — 2022", description: LOREM },
    ],
  },
  {
    id: "fitness",
    label: "Fitness",
    entries: [
      { title: "Lagree Instructor", org: "Lorem Fitness", dates: "2023 — Present", description: LOREM },
      { title: "Hike Crew Organizer", org: "Ipsum Outdoors", dates: "2022 — Present", description: LOREM },
      { title: "Group Fitness Coach", org: "Dolor Athletics", dates: "2020 — 2022", description: LOREM },
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
                          <p
                            style={{
                              margin: 0,
                              paddingTop: 14,
                              fontSize: 13,
                              lineHeight: 1.8,
                              maxWidth: "60ch",
                              fontFamily: "var(--font-mono)",
                              color: "var(--page-body)",
                            }}
                          >
                            {entry.description}
                          </p>
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
