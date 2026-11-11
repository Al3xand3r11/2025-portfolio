"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";

const PLACEHOLDER =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.";

const PROJECTS = [
  {
    title: "The Saturday Hike Crew",
    slug: "saturday-hike-crew",
    tags: "Next.js · TypeScript · Tailwind CSS",
    description: PLACEHOLDER,
    image: "/studyimages/shc1.webp",
  },
  {
    title: "Cleo +",
    slug: "cleo-plus",
    tags: "Next.js · WebGL · Entertainment",
    description: PLACEHOLDER,
    image: "/studyimages/mm1.webp",
  },
  {
    title: "Egle Zalpys",
    slug: "egle-zalpys",
    tags: "Next.js · Portfolio · Design",
    description: PLACEHOLDER,
    image: "/studyimages/ez1.webp",
  },
];

const ADDITIONAL_PROJECTS = [
  { title: "Seen By Liz", href: "https://seenbyliz.com" },
  { title: "Bowie Forward", href: "https://bowieforward.com" },
  { title: "Python Image Converter", href: "https://github.com/Al3xand3r11/python-image-converter/tree/main" },
  { title: "Sunday Runday LA", href: "https://www.sundayrundayla.com/" },
  { title: "Food Desert Finder", href: "https://github.com/Al3xand3r11/food-desert-fixer" },
];

export default function EngineeringPage() {
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
      <PageHeader activeLabel="Work" />

      <section style={{ padding: "48px 24px 80px", paddingLeft: 24, paddingRight: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 120,
              marginTop: 48,
            }}
          >
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                isMobile={isMobile}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: 96, textAlign: "left" }}
        >
          <h2
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontFamily: "var(--font-mono)",
              margin: "0 0 8px",
            }}
          >
            Additional Projects
          </h2>

          {ADDITIONAL_PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 16,
                padding: "16px 0",
                textDecoration: "none",
                color: "var(--page-fg)",
                fontFamily: "var(--font-display)",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.4")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <span
                style={{
                  fontSize: "clamp(20px, 3vw, 32px)",
                  fontWeight: 300,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                }}
              >
                {project.title}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ flexShrink: 0, transform: "rotate(-45deg)" }}
              >
                <path d="M5 12h14M13 5l6 7-6 7" />
              </svg>
            </a>
          ))}
        </motion.div>
      </section>

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

function ProjectCard({
  project,
  index,
  isMobile,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  isMobile: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 2fr) minmax(0, 3fr)",
        gap: isMobile ? 20 : 48,
        alignItems: "stretch",
        width: "100%",
        minWidth: 0,
      }}
    >
      <div
        style={{
          textAlign: "left",
          order: isMobile ? 2 : 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div>
          <p
            style={{
              fontSize: "clamp(18px, 2vw, 26px)",
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              fontFamily: "var(--font-display)",
              margin: 0,
            }}
          >
            {project.title}
          </p>
          <p
            style={{
              fontSize: 12,
              lineHeight: 1.6,
              maxWidth: "36ch",
              margin: "16px 0 0",
              fontFamily: "var(--font-mono)",
            }}
          >
            {project.description}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
        <p
          style={{
            fontSize: 10,
            lineHeight: 1.6,
            letterSpacing: "0.04em",
            margin: 0,
            color: "var(--page-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {project.tags}
        </p>
        <Link
          href={`/engineering/${project.slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 6,
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--page-fg)",
            textDecoration: "none",
            fontFamily: "var(--font-mono)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.4")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          View Case Study
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
        </div>
      </div>

      <Link
        href={`/engineering/${project.slug}`}
        style={{
          display: "block",
          textDecoration: "none",
          color: "inherit",
          order: isMobile ? 1 : 2,
          minWidth: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 10",
            overflow: "hidden",
            borderRadius: 12,
            backgroundColor: "var(--page-surface)",
          }}
        >
          <Image
            src={project.image}
            alt={`${project.title} landing page`}
            fill
            sizes="(max-width: 767px) 100vw, 60vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>
    </motion.article>
  );
}
