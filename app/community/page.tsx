import Link from "next/link";
import Community from "../components/Community";
import PageHeader from "../components/PageHeader";

export default function CommunityPage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "var(--page-bg)",
        color: "var(--page-fg)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <PageHeader activeLabel="Community" />

      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--page-fg)",
          margin: "0 24px",
        }}
      />

      <Community />

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
