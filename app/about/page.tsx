"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";

const BIO =
  "I am a software engineer, lagree instructor, and community ambassador in Los Angeles, California. Moving from Maryland in 2022, after graduating from Towson University with a degree in Computer Science, I have gained years of experience in multiple sectors focused on connecting communities and continued curiosity.";

const LINKS = [
  { label: "Resume", href: "/BrandonNance-Resume26pdf.pdf" },
  { label: "GitHub", href: "https://github.com/Al3xand3r11" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bnance1/" },
];

function BioLinks({ fontSize }: { fontSize: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 40,
        fontSize,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--page-fg)",
            textDecoration: "underline",
            textUnderlineOffset: 6,
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "var(--page-bg)",
        color: "var(--page-fg)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <PageHeader activeLabel="About" />

      {isMobile ? (
        <section style={{ padding: "48px 24px 80px" }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
              fontSize: 13,
              lineHeight: 1.8,
            }}
          >
            <p style={{ margin: 0 }}>{BIO}</p>
            <BioLinks fontSize={12} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              position: "relative",
              aspectRatio: "3 / 4",
              maxHeight: "50vh",
              overflow: "hidden",
              marginTop: 32,
            }}
          >
            <Image
              src="/images/bheadshot.webp"
              alt="Brandon Nance"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", filter: "brightness(0.75)" }}
            />
          </motion.div>
        </section>
      ) : (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 7fr",
            gap: 64,
            padding: "48px 24px 80px",
            width: "100%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "relative",
              aspectRatio: "3 / 4",
              maxHeight: "60vh",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/bheadshot.webp"
              alt="Brandon Nance"
              fill
              priority
              sizes="36vw"
              style={{ objectFit: "cover", filter: "brightness(0.75)" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop: "10vh",
              gap: 40,
              fontSize: 24,
              lineHeight: 1.8,
            }}
          >
            <p style={{ margin: 0 }}>{BIO}</p>
            <BioLinks fontSize={14} />
          </motion.div>
        </section>
      )}

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
