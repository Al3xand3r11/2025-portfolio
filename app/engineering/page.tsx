"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";

const PROJECTS = [
  {
    title: "The Saturday Hike Crew",
    slug: "saturday-hike-crew",
    tags: "Next.js · TypeScript · Tailwind CSS",
    video: "/videos/shcvid.mp4",
    poster: "/studyimages/shc1.webp",
    url: "https://thesaturdayhikecrew.com",
  },
  {
    title: "Seen By Liz",
    slug: "seen-by-liz",
    tags: "Next.js · Photography · Portfolio",
    video: "/videos/sblvid.mp4",
    poster: "/studyimages/sbl1.webp",
    url: "https://seenbyliz.com",
  },
  {
    title: "Moments of Metanoia",
    slug: "moments-of-metanoia",
    tags: "Next.js · WebGL · Entertainment",
    video: "/videos/mmvid.mp4",
    poster: "/studyimages/mm1.webp",
    url: "https://itscleoplus.com",
  },
  {
    title: "Bowie Forward",
    slug: "bowie-forward",
    tags: "Next.js · TypeScript · Community",
    video: "/videos/bfvid.mp4",
    poster: "/studyimages/bf1.webp",
    url: "https://bowieforward.com",
  },
];

const ADDITIONAL_PROJECTS = [
  { title: "TMinus Talent", href: "https://tminustalent.com" },
  { title: "Python Image Converter", href: "https://github.com/Al3xand3r11/python-image-converter/tree/main" },
  { title: "Sunday Runday LA", href: "https://www.sundayrundayla.com/" },
  { title: "Food Desert Finder", href: "https://github.com/Al3xand3r11/food-desert-fixer" },
];

export default function EngineeringPage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "var(--font-mono)",
      }}
    >
      <PageHeader activeLabel="Engineering" />

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #000",
          margin: "0 24px",
        }}
      />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ padding: "64px 24px 24px" }}
      >
        <h1
          style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            fontFamily: "var(--font-display)",
            maxWidth: "900px",
          }}
        >
          Recent Engineering Projects
        </h1>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginTop: 24,
            fontFamily: "var(--font-mono)",
          }}
        >
          Written in TypeScript
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 16,
          padding: "48px 24px 80px",
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ padding: "0 24px 80px" }}
      >
        <h2
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-mono)",
            marginBottom: 24,
          }}
        >
          Additional Projects
        </h2>

        {ADDITIONAL_PROJECTS.map((project, i) => (
          <div key={project.title}>
            <div style={{ borderTop: "1px solid #000" }} />
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 0",
                textDecoration: "none",
                color: "#000",
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
                style={{ flexShrink: 0, marginLeft: 24, transform: "rotate(-45deg)" }}
              >
                <path d="M5 12h14M13 5l6 7-6 7" />
              </svg>
            </a>
            {i === ADDITIONAL_PROJECTS.length - 1 && (
              <div style={{ borderTop: "1px solid #000" }} />
            )}
          </div>
        ))}
      </motion.section>

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

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div
      style={{
        paddingLeft: index % 2 === 1 ? 24 : 0,
        borderLeft: index % 2 === 1 ? "1px solid #000" : "none",
        marginTop: index < 2 ? 24 : 0,
      }}
    >
      <div
        style={{
          borderTop: index >= 2 ? "1px solid #000" : "none",
          paddingTop: index >= 2 ? 24 : 0,
          paddingBottom: 24,
        }}
      >
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "relative",
            aspectRatio: "4 / 3",
            overflow: "hidden",
            backgroundColor: "#f0f0f0",
            cursor: "pointer",
          }}
        >
          <Link href={`/engineering/${project.slug}`} style={{ display: "block", position: "absolute", inset: 0 }}>
            <video
              ref={videoRef}
              src={project.video}
              muted
              playsInline
              loop
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <img
              src={project.poster}
              alt={project.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: hovered ? 0 : 1,
                transition: "opacity 0.3s",
                zIndex: 1,
              }}
            />
          </Link>
        </div>
        <p
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginTop: 16,
            color: "#666",
            fontFamily: "var(--font-mono)",
          }}
        >
          {project.tags}
        </p>
        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            marginTop: 4,
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
          }}
        >
          {project.title}
        </p>
        <Link
          href={`/engineering/${project.slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#000",
            textDecoration: "none",
            marginTop: 8,
            fontFamily: "var(--font-mono)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.4")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          View Case Study
          <svg
            width="14"
            height="14"
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
  );
}
