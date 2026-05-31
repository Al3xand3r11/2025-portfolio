"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const playlists = [
  { title: "Playlist 1", url: "https://embed.music.apple.com/us/playlist/516/pl.u-9N9LbEpFxZlP2pr" },
  { title: "Playlist 2", url: "https://embed.music.apple.com/us/playlist/5224/pl.u-76oNZ1MFWRd64Dp" },
];

export default function MusicContent() {
  return (
    <>
      <div style={{ padding: "24px 24px 0" }}>
        <Link
          href="/lagree"
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontFamily: "var(--font-mono)",
            color: "#000",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
        >
          &larr; Back
        </Link>
      </div>

      <div style={{ padding: "48px 24px 24px" }}>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
            Music for Class
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
            Last month&apos;s Lagree playlists
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: 48,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          {playlists.map((playlist) => (
            <div
              key={playlist.url}
              style={{
                border: "1px solid #000",
                padding: 24,
              }}
            >
              <iframe
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                frameBorder="0"
                height="450"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src={playlist.url}
                style={{ width: "100%", borderRadius: 8, background: "transparent" }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
