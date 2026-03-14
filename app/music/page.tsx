import type { Metadata } from "next";
import MusicContent from "./MusicContent";

export const metadata: Metadata = {
  title: "Music | Brandon Nance",
  description: "Curated playlists from Apple Music.",
};

export default function MusicPage() {
  return (
    <main className="min-h-screen">
      <MusicContent />
    </main>
  );
}
