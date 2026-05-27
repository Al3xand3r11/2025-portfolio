import Link from "next/link";
import Work from "../components/Work";
import Additional from "../components/Additional";

export default function EngineeringPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 text-[var(--color-muted)] hover:text-[var(--color-foreground)] text-sm transition-colors"
      >
        &larr;
      </Link>
      <Work />
      <Additional />
    </main>
  );
}
