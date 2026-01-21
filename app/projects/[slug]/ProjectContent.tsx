"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "../../lib/projects";

interface ProjectContentProps {
  project: Project;
}

export default function ProjectContent({ project }: ProjectContentProps) {
  return (
    <main className="min-h-screen pt-[var(--header-height)]">
      {/* Hero Section */}
      <section className="py-[var(--section-padding)] border-b border-[var(--color-border)]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back link */}
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors mb-8"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back to projects</span>
            </Link>

            {/* Year */}
            <span
              className="text-xs text-[var(--color-muted)] uppercase tracking-widest block mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {project.year}
            </span>

            {/* Title */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-8"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {project.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-[var(--color-card)] text-[var(--color-muted-foreground)] border border-[var(--color-border)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-xl md:text-2xl text-[var(--color-muted-foreground)] leading-relaxed max-w-3xl">
              {project.longDescription || project.description}
            </p>

            {/* Visit site button */}
            <div className="mt-12">
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-background)] font-medium rounded-sm hover:bg-[var(--color-accent-warm)] transition-colors"
              >
                <span>Visit Live Site</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Preview Section */}
      <section className="py-[var(--section-padding)] bg-[var(--color-card)]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Corner brackets */}
            <span className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-[var(--color-accent)]" />
            <span className="absolute -top-4 -right-4 w-8 h-8 border-t border-r border-[var(--color-accent)]" />
            <span className="absolute -bottom-4 -left-4 w-8 h-8 border-b border-l border-[var(--color-accent)]" />
            <span className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-[var(--color-accent)]" />

            {/* Iframe container */}
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl bg-white">
              <iframe
                src={project.url}
                title={`${project.title} live preview`}
                className="w-full h-full border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Images Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="py-[var(--section-padding)]">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl mb-12"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Project Gallery
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {project.images.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative aspect-video rounded-lg overflow-hidden bg-[var(--color-card)]"
                >
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Project CTA */}
      <section className="py-[var(--section-padding)] border-t border-[var(--color-border)]">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[var(--color-muted)] mb-4">Interested in working together?</p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-2xl md:text-3xl hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span>Let&apos;s talk</span>
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

