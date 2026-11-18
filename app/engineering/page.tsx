"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import Parallax from "../components/Parallax";
import { CASE_STUDIES } from "../lib/caseStudies";
import { ADDITIONAL_PROJECTS } from "../lib/additionalProjects";

const PROJECTS = [
  {
    title: "The Saturday Hike Crew",
    slug: "saturday-hike-crew",
    tags: "Next.js · TypeScript · Tailwind CSS",
    description: CASE_STUDIES["saturday-hike-crew"].intro,
    image: "/studyimages/shc1.webp",
  },
  {
    title: "Cleo +",
    slug: "cleo-plus",
    tags: "Next.js · WebGL · Entertainment",
    description: CASE_STUDIES["cleo-plus"].intro,
    image: "/studyimages/mm1.webp",
  },
  {
    title: "Egle Zalpys",
    slug: "egle-zalpys",
    tags: "Next.js · Portfolio · Design",
    description: CASE_STUDIES["egle-zalpys"].intro,
    image: "/studyimages/ez1.webp",
  },
];

export default function EngineeringPage() {
  const reduceMotion = useReducedMotion();
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
        paddingInline: "clamp(24px, 5vw, 80px)",
        minHeight: "100svh",
        backgroundColor: "var(--page-bg)",
        color: "var(--page-fg)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <PageHeader activeLabel="Work" />

      <section style={{ paddingBottom: 80 }}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "flex-end",
              justifyContent: "space-between",
              gap: isMobile ? 24 : 48,
              paddingBlock: isMobile ? 96 : 200,
              textAlign: "left",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontFamily: "var(--font-display)",
                  backgroundColor:
                    "color-mix(in srgb, var(--page-fg) 6%, transparent)",
                }}
              >
                Written in TypeScript
              </span>
              <h1
                style={{
                  margin: "16px 0 0",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-display)",
                }}
              >
                Current Projects
                <br />
                <span style={{ color: "var(--page-muted)" }}>
                  Higlighting Activity, Art, and Culture
                </span>
              </h1>
            </div>

            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <a
                href="https://www.linkedin.com/in/bnance1/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...pillBase,
                  gap: 8,
                  color: "var(--page-fg)",
                  backgroundColor:
                    "color-mix(in srgb, var(--page-fg) 6%, transparent)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/Al3xand3r11"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...pillBase,
                  gap: 8,
                  color: "var(--page-bg)",
                  backgroundColor: "var(--page-fg)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 64 : 96,
            }}
          >
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                isMobile={isMobile}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reduceMotion ? 0 : 0.7 }}
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
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
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
          paddingBlock: 24,
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

const pillBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 18px",
  borderRadius: 999,
  fontSize: 14,
  fontFamily: "var(--font-display)",
  textDecoration: "none",
  whiteSpace: "nowrap",
  transition: "opacity 0.2s",
};

function ProjectCard({
  project,
  index,
  isMobile,
  reduceMotion,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  isMobile: boolean;
  reduceMotion: boolean | null;
}) {
  const study = CASE_STUDIES[project.slug];
  const padding = isMobile ? 24 : 48;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : 0.08 * (index + 1),
      }}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: isMobile ? "4 / 5" : "16 / 8",
        overflow: "hidden",
        borderRadius: 8,
        color: "#fff",
      }}
    >
      <Parallax>
        <Image
          src={project.image}
          alt={`${project.title} landing page`}
          fill
          unoptimized={project.slug === "egle-zalpys"}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </Parallax>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.2) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          textAlign: "left",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(28px, 3.2vw, 44px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-display)",
            }}
          >
            {project.title}
          </h2>
          <p
            style={{
              margin: "10px 0 0",
              fontSize: isMobile ? 20 : 22,
              lineHeight: 1.45,
              opacity: 0.85,
              fontFamily: "var(--font-display)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
            <Link
              href={`/engineering/${project.slug}`}
              style={{ ...pillBase, backgroundColor: "#fff", color: "#111" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View more
            </Link>
            {study?.url && (
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...pillBase,
                  backgroundColor: "rgba(40, 36, 32, 0.55)",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Visit website
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
