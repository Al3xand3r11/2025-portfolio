import Link from "next/link";
import Contact from "../components/Contact";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 text-[var(--color-muted)] hover:text-[var(--color-foreground)] text-sm transition-colors"
      >
        &larr;
      </Link>
      <Contact />
    </main>
  );
}
