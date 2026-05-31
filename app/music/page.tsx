import type { Metadata } from "next";
import Link from "next/link";
import MusicContent from "./MusicContent";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Music | Brandon Nance",
  description: "Curated playlists from Apple Music.",
};

export default function MusicPage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "var(--font-mono)",
      }}
    >
      <PageHeader />

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #000",
          margin: "0 24px",
        }}
      />

      <MusicContent />

      <footer
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 24,
        }}
      >
        <Link
          href="/"
          style={{
            color: "#000",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-mono)",
            textDecoration: "none",
          }}
        >
          Brandon Alexander
        </Link>
      </footer>
    </main>
  );
}
