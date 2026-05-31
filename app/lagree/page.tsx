import type { Metadata } from "next";
import Link from "next/link";
import LagreeContent from "./LagreeContent";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Lagree | Brandon Nance",
  description: "My Lagree class schedule at Lagree213 in Los Angeles.",
};

export default function LagreePage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "var(--font-mono)",
      }}
    >
      <PageHeader activeLabel="Lagree" />

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #000",
          margin: "0 24px",
        }}
      />

      <LagreeContent />

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
