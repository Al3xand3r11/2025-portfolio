"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-neutral-100 animate-pulse" />
  ),
});

type Tab = "megaburn" | "specialty" | "sub";

type ClassTime = {
  time: string;
  label?: string;
};

type LagreeClass = {
  day: string;
  date?: string;
  locationName: string;
  address: string;
  mapUrl: string;
  lat: number;
  lng: number;
  times: ClassTime[];
};

const tabs: { id: Tab; label: string }[] = [
  { id: "megaburn", label: "Megaburn" },
  { id: "specialty", label: "Specialty" },
  { id: "sub", label: "Sub" },
];

const tabDescriptions: Record<Tab, string> = {
  megaburn: "45 minute full body workout",
  specialty: "Classes targeting specific muscle groups",
  sub: "Days and times coming up I do not normally teach",
};

const ARTS_DISTRICT = {
  locationName: "Arts District",
  address: "300 S Santa Fe Ave",
  mapUrl: "https://maps.google.com/?q=300+S+Santa+Fe+Ave,+Los+Angeles,+CA",
  lat: 34.0434,
  lng: -118.2332,
};

const HISTORIC_CORE = {
  locationName: "Historic Core",
  address: "835 S Hill St",
  mapUrl: "https://maps.google.com/?q=835+S+Hill+St,+Los+Angeles,+CA",
  lat: 34.0440,
  lng: -118.2560,
};

const schedule: Record<Tab, LagreeClass[]> = {
  megaburn: [
    {
      day: "Sunday",
      ...ARTS_DISTRICT,
      times: [{ time: "3:30 PM" }, { time: "4:30 PM" }, { time: "5:30 PM" }],
    },
    {
      day: "Monday",
      ...ARTS_DISTRICT,
      times: [{ time: "4:30 PM" }, { time: "5:30 PM" }, { time: "6:30 PM" }],
    },
    {
      day: "Wednesday",
      ...ARTS_DISTRICT,
      times: [{ time: "4:30 PM" }, { time: "5:30 PM" }, { time: "6:30 PM" }],
    },
    {
      day: "Friday",
      ...HISTORIC_CORE,
      times: [
        { time: "4:00 PM" },
        { time: "5:00 PM" },
        { time: "6:00 PM", label: "Arms & Abs" },
      ],
    },
  ],
  specialty: [
    {
      day: "Friday",
      ...HISTORIC_CORE,
      times: [{ time: "6:00 PM", label: "Arms & Abs" }],
    },
  ],
  sub: [
    {
      day: "Tuesday",
      date: "6/23",
      ...HISTORIC_CORE,
      times: [
        { time: "3:00 PM" },
        { time: "4:00 PM" },
        { time: "5:00 PM" },
        { time: "6:00 PM" },
      ],
    },
    {
      day: "Friday",
      date: "6/26",
      ...HISTORIC_CORE,
      times: [
        { time: "6:00 AM" },
        { time: "7:00 AM" },
      ],
    },
  ],
};

const MINDBODY_URL = "https://www.lagree213.com/book-a-class";
const CLASSPASS_URL = "https://classpass.com";

function ClassCard({ cls, index }: { cls: LagreeClass; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        border: "1px solid #000",
        padding: 24,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <a
        href={cls.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          position: "relative",
          height: 200,
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
        }}
      >
        <LocationMap lat={cls.lat} lng={cls.lng} />
      </a>

      <div style={{ marginTop: 20 }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontFamily: "var(--font-mono)",
          }}
        >
          {cls.locationName}
        </p>
        <p
          style={{
            fontSize: 11,
            color: "#666",
            marginTop: 4,
            fontFamily: "var(--font-mono)",
          }}
        >
          {cls.address}
        </p>
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #e0e0e0",
          margin: "20px 0",
        }}
      />

      <div>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 900,
            textTransform: "uppercase",
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.01em",
          }}
        >
          {cls.day}
        </h3>
        {cls.date && (
          <span
            style={{
              fontSize: 11,
              color: "#666",
              display: "block",
              marginTop: 4,
              fontFamily: "var(--font-mono)",
            }}
          >
            {cls.date}
          </span>
        )}
      </div>

      <div style={{ marginTop: 20, flex: 1 }}>
        {cls.times.map((t, j) => (
          <div
            key={j}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: j < cls.times.length - 1 ? 12 : 0,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                color: "#000",
              }}
            >
              {t.time}
            </span>
            {t.label && (
              <span
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#999",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {t.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #e0e0e0",
          margin: "20px 0",
        }}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <a
          href={MINDBODY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "8px 16px",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
            border: "1px solid #000",
            color: "#000",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          Mindbody
        </a>
        <a
          href={CLASSPASS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "8px 16px",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
            border: "1px solid #000",
            color: "#000",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          ClassPass
        </a>
      </div>
    </motion.div>
  );
}

export default function LagreeContent() {
  const [activeTab, setActiveTab] = useState<Tab>("megaburn");
  const classes = schedule[activeTab];

  const gridStyle: React.CSSProperties =
    classes.length === 1
      ? { gridTemplateColumns: "1fr", maxWidth: 400, margin: "0 auto" }
      : classes.length <= 3
        ? { gridTemplateColumns: "repeat(3, 1fr)" }
        : { gridTemplateColumns: "repeat(4, 1fr)" };

  return (
    <div style={{ padding: "48px 24px 24px" }}>
      <section>
        <h1
          style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            fontFamily: "var(--font-display)",
            maxWidth: 900,
          }}
        >
          Weekly Lagree Schedule
        </h1>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginTop: 24,
            fontFamily: "var(--font-mono)",
            color: "#666",
          }}
        >
          {tabDescriptions[activeTab]}
        </p>
      </section>

      <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "8px 20px",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                border: "1px solid #000",
                backgroundColor: isActive ? "#000" : "#fff",
                color: isActive ? "#fff" : "#000",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 48 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "grid",
              gap: 16,
              ...gridStyle,
            }}
          >
            {classes.map((cls, i) => (
              <ClassCard
                key={`${cls.day}-${cls.date || ""}-${i}`}
                cls={cls}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
