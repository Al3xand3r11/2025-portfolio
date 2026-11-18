import Link from "next/link";
import Community from "../components/Community";
import PageHeader from "../components/PageHeader";

export default function LifePage() {
  return (
    <main
      style={{
        paddingInline: "clamp(24px, 5vw, 80px)",
        minHeight: "100svh",
        backgroundColor: "var(--page-bg)",
        color: "var(--page-fg)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <PageHeader activeLabel="Life" />

      <Community />

      <footer
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBlock: 24,
        }}
      >
        <Link
          href="/"
          style={{
            color: "var(--page-fg)",
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
