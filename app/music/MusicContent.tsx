"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "lagree" | "archives" | "running";

const tabs: { id: Tab; label: string }[] = [
  { id: "lagree", label: "Last Month Lagree" },
  { id: "archives", label: "Archives" },
  { id: "running", label: "Running" },
];

const playlists: Record<Tab, { title: string; url: string }[]> = {
  lagree: [
    { title: "Playlist 1", url: "https://embed.music.apple.com/us/playlist/3-1-3-30/pl.u-JPAZyg9sD6NoXyp" },
    { title: "Playlist 2", url: "https://embed.music.apple.com/us/playlist/3-9-12/pl.u-d2b0do2uM7aVpqR" },
    { title: "Playlist 3", url: "https://embed.music.apple.com/us/playlist/3-15-5-30/pl.u-DdANlN5Fa7PvyG9" },
    { title: "Playlist 4", url: "https://embed.music.apple.com/us/playlist/3-23-630/pl.u-76oNr4BTWRd64Dp" },
    { title: "Playlist 5", url: "https://embed.music.apple.com/us/playlist/330-530/pl.u-11zBzkmt836dxrJ"},
  ],
  archives: [
    { title: "Playlist 1", url: "https://embed.music.apple.com/us/playlist/random-25-tunes/pl.u-V9D7ovaHB8GXqxd" },
    { title: "Playlist 2", url: "https://embed.music.apple.com/us/playlist/lagree-2025-archive/pl.u-e98l5KKfzmXLPRA" },
  ],
  running: [
    { title: "Playlist 1", url: "https://embed.music.apple.com/us/playlist/music-for-the-insane-cim/pl.u-JPAZoEPFD6NoXyp" },
    { title: "Playlist 2", url: "https://embed.music.apple.com/us/playlist/sf-half/pl.u-mJy8ZB8uzkLPG96" },
  ],
};

export default function MusicContent() {
  const [activeTab, setActiveTab] = useState<Tab>("lagree");
  const active = playlists[activeTab];

  const gridCols =
    active.length <= 2
      ? "grid-cols-1 sm:grid-cols-2"
      : active.length <= 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

  return (
    <div style={{ paddingTop: "calc(var(--header-height) + 2rem)" }}>
      {/* Header & Tabs */}
      <div style={{ paddingLeft: 64, paddingRight: 64, marginBottom: 40 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: "var(--color-foreground)",
            marginBottom: 20,
          }}
        >
          Music
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
      </div>

      {/* Playlists */}
      <div style={{ paddingLeft: 64, paddingRight: 64, paddingBottom: 64 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`grid gap-6 ${gridCols}`}
          >
            {active.map((playlist, i) => (
              <motion.div
                key={playlist.url}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <iframe
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  frameBorder="0"
                  height="650"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src={`${playlist.url}?theme=dark`}
                  className="w-full rounded-2xl"
                  style={{ background: "transparent" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
