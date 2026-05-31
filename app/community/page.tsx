import Link from "next/link";
import Community from "../components/Community";
import PageHeader from "../components/PageHeader";

export default function CommunityPage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "var(--font-mono)",
      }}
    >
      <PageHeader activeLabel="Community" />

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #000",
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
