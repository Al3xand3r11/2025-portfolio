import Link from "next/link";
import Community from "../components/Community";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 text-[var(--color-muted)] hover:text-[var(--color-foreground)] text-sm transition-colors"
      >
        &larr;
      </Link>
      <Community />
    </main>
  );
}
