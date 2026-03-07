"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { projects, type Project } from "../lib/projects";

const projectMeta: Record<string, { category: string; industry: string; deliverables: string[] }> = {
  "saturday-hike-crew": {
    category: "COMMUNITY PLATFORM",
    industry: "OUTDOOR & WELLNESS",
    deliverables: ["WEB DEVELOPMENT", "DASHBOARD DESIGN", "BRAND IDENTITY"],
  },
  "seen-by-liz": {
    category: "PORTFOLIO WEBSITE",
    industry: "PHOTOGRAPHY",
    deliverables: ["VISUAL IDENTITY", "WEB DEVELOPMENT", "ART DIRECTION"],
  },
  itscleoplus: {
    category: "ARTIST WEBSITE",
    industry: "MUSIC & ENTERTAINMENT",
    deliverables: ["BRAND STRATEGY", "VISUAL IDENTITY", "WEB DEVELOPMENT"],
  },
};

export default function Work() {
  const filteredProjects = projects.filter((p) => p.slug !== "tminus-talent");

  return (
    <section id="work" className="relative">
      {/* Top bar */}
      <div
        className="border-y border-[var(--color-border)] py-4 px-6 md:px-10 flex items-center justify-between"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-foreground)]">
          Selected Projects
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-foreground)] inline-block" />
        <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-foreground)]">
          WO-01
        </span>
      </div>

      {/* Projects */}
      {filteredProjects.map((project, index) => (
        <ProjectBlock key={project.slug} project={project} index={index} total={filteredProjects.length} />
      ))}

    </section>
  );
}

function ProjectBlock({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const image = project.images?.[0];
  const meta = projectMeta[project.slug] || {
    category: "WEB PROJECT",
    industry: "TECHNOLOGY",
    deliverables: ["WEB DEVELOPMENT"],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8 }}
      className={`grid grid-cols-1 md:grid-cols-12 ${index < total - 1 ? "border-b border-[var(--color-border)]" : ""}`}
    >
      {/* Left column — project info */}
      <div className="md:col-span-5 lg:col-span-4 px-6 md:px-10 py-12 md:py-16 flex flex-col justify-between md:border-r border-[var(--color-border)]">
        <div>
          {/* Title */}
          <h3
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-foreground)] uppercase leading-[0.95] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h3>

          {/* Category */}
          <p
            className="text-xs tracking-[0.15em] uppercase text-[var(--color-foreground)] font-medium mb-8"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {meta.category}
          </p>

          {/* View Project link */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-[var(--color-foreground)] hover:text-[var(--color-accent-warm)] transition-colors mb-14"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            View Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>

        {/* Metadata */}
        <div className="space-y-6">
          <div>
            <span
              className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)] mb-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Industry
            </span>
            <span
              className="block text-xs tracking-[0.1em] uppercase text-[var(--color-foreground)] font-medium"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {meta.industry}
            </span>
          </div>

          <div>
            <span
              className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)] mb-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Year
            </span>
            <span
              className="block text-xs tracking-[0.1em] uppercase text-[var(--color-foreground)] font-medium"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {project.year}
            </span>
          </div>

          <div>
            <span
              className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)] mb-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Deliverables
            </span>
            <div style={{ fontFamily: "var(--font-mono)" }}>
              {meta.deliverables.map((d) => (
                <span
                  key={d}
                  className="block text-xs tracking-[0.1em] uppercase text-[var(--color-foreground)] font-medium leading-relaxed"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right column — image */}
      <div className="md:col-span-7 lg:col-span-8 relative">
        <div className="relative w-full h-full min-h-[50vh] md:min-h-[70vh]">
          {image ? (
            <Image
              src={image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          ) : (
            <div className="w-full h-full bg-[var(--color-card)]" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
