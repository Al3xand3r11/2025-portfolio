"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-white/[0.03] animate-pulse" />
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
      day: "Thursday",
      date: "4/9",
      ...HISTORIC_CORE,
      times: [
        { time: "3:00 PM" },
        { time: "4:00 PM" },
        { time: "5:00 PM" },
        { time: "6:00 PM" },
      ],
    },
    {
      day: "Tuesday",
      date: "4/14",
      ...HISTORIC_CORE,
      times: [
        { time: "3:00 PM" },
        { time: "4:00 PM" },
        { time: "5:00 PM" },
        { time: "6:00 PM" },
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
      className="rounded-[28px] border border-white/[0.1] bg-white/[0.07] backdrop-blur-2xl flex flex-col"
      style={{ padding: 24 }}
    >
      <a
        href={cls.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative rounded-2xl overflow-hidden cursor-pointer group"
        style={{ height: 240 }}
      >
        <LocationMap lat={cls.lat} lng={cls.lng} />
        <div className="absolute inset-0 z-10 group-hover:bg-white/[0.03] transition-colors" />
      </a>

      <div style={{ marginTop: 20 }}>
        <p className="font-medium text-white/80" style={{ fontSize: 16 }}>
          {cls.locationName}
        </p>
        <p className="text-white/35" style={{ fontSize: 13, marginTop: 3 }}>
          {cls.address}
        </p>
      </div>

      <div
        className="bg-white/[0.06]"
        style={{ height: 1, marginTop: 20, marginBottom: 20 }}
      />

      <div>
        <h3 className="font-medium text-white" style={{ fontSize: 22 }}>
          {cls.day}
        </h3>
        {cls.date && (
          <span
            className="text-white/40 block"
            style={{ fontSize: 15, marginTop: 3 }}
          >
            {cls.date}
          </span>
        )}
      </div>

      <div className="flex-1" style={{ marginTop: 20 }}>
        {cls.times.map((t, j) => (
          <div
            key={j}
            className="flex items-center justify-between"
            style={{ marginBottom: j < cls.times.length - 1 ? 12 : 0 }}
          >
            <span
              className="text-white/60"
              style={{ fontSize: 16, fontFamily: "var(--font-mono)" }}
            >
              {t.time}
            </span>
            {t.label && (
              <span
                className="text-white/25 uppercase tracking-widest"
                style={{ fontSize: 11 }}
              >
                {t.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div
        className="bg-white/[0.06]"
        style={{ height: 1, marginTop: 20, marginBottom: 20 }}
      />

      <div className="flex items-center" style={{ gap: 10 }}>
        <a
          href={MINDBODY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/[0.08] bg-white/[0.04] uppercase text-white/35 hover:text-white/80 hover:bg-white/[0.1] hover:border-white/[0.15] hover:shadow-[0_0_16px_rgba(255,255,255,0.06)] transition-all duration-300"
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
            fontSize: 11,
            letterSpacing: "0.1em",
          }}
        >
          Mindbody
        </a>
        <a
          href={CLASSPASS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/[0.08] bg-white/[0.04] uppercase text-white/35 hover:text-white/80 hover:bg-white/[0.1] hover:border-white/[0.15] hover:shadow-[0_0_16px_rgba(255,255,255,0.06)] transition-all duration-300"
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
            fontSize: 11,
            letterSpacing: "0.1em",
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

  const gridClass =
    classes.length === 1
      ? "grid-cols-1 max-w-md mx-auto"
      : classes.length <= 3
        ? "grid-cols-1 sm:grid-cols-3 mx-auto"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto";

  return (
    <div
      className="relative z-10 flex flex-col h-screen overflow-y-auto"
      style={{ paddingTop: "calc(var(--header-height) + 2rem)" }}
    >
      {/* Header & Tabs */}
      <div
        style={{
          paddingLeft: 64,
          paddingRight: 64,
          marginBottom: 40,
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: "rgba(255,255,255,0.9)",
            marginBottom: 20,
          }}
        >
          Weekly Lagree Schedule
        </h1>

        <div style={{ display: "flex", gap: 10 }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 9,
                  paddingBottom: 9,
                  borderRadius: 9999,
                  border: isActive
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "1px solid rgba(255,255,255,0.08)",
                  background: isActive
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.04)",
                  color: isActive
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.35)",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: isActive
                    ? "0 0 16px rgba(255,255,255,0.08), 0 0 4px rgba(255,255,255,0.04)"
                    : "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <p
          style={{
            marginTop: 14,
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          {tabDescriptions[activeTab]}
        </p>
      </div>

      {/* Cards */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{ paddingLeft: 64, paddingRight: 64, paddingBottom: 40 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`grid w-full ${gridClass}`}
            style={{ gap: 24 }}
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
