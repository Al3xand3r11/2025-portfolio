import type { Metadata } from "next";
import Image from "next/image";
import LagreeContent from "./LagreeContent";

export const metadata: Metadata = {
  title: "Lagree | Brandon Nance",
  description: "My Lagree class schedule at Lagree213 in Los Angeles.",
};

export default function LagreePage() {
  return (
    <main className="relative h-screen overflow-hidden">
      <Image
        src="/images/lagree4.webp"
        alt="Lagree studio"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

      <LagreeContent />
    </main>
  );
}
