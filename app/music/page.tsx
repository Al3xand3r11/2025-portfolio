import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music | Brandon Nance",
  description: "Curated playlists from Apple Music.",
};

export default function MusicPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span
          className="text-xs tracking-[0.3em] uppercase text-[var(--color-muted)] block mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Music
        </span>
        <h1 className="text-4xl md:text-5xl font-medium text-[var(--color-foreground)] mb-4">
          Coming Soon
        </h1>
        <p className="text-[var(--color-muted)] text-sm leading-relaxed">
          Curated playlists from Apple Music.
        </p>
      </div>
    </main>
  );
}
