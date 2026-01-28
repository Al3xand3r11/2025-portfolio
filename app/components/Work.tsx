"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { projects } from "../lib/projects";

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="work" ref={sectionRef} className="relative">
      {/* Subtle section indicator */}
      <motion.div
        style={{ opacity }}
        className="container py-16 lg:py-24"
      >
        <div className="flex items-center gap-4">
          <span className="w-12 h-px bg-[var(--color-border)]" />
          <span
            className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Selected Work
          </span>
        </div>
      </motion.div>

      {/* Projects */}
      <div className="pb-32 lg:pb-48">
        {projects.map((project, index) => (
          <ProjectBento key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

interface ProjectBentoProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectBento({ project, index }: ProjectBentoProps) {
  const bentoRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: bentoRef,
    offset: ["start end", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const images = project.images || [];

  return (
    <motion.div
      ref={bentoRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="container"
      style={{ paddingTop: index > 0 ? '250px' : '0' }}
    >
      {/* Project Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-[var(--color-foreground)] mb-12 lg:mb-16"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {project.title}
      </motion.h2>

      {/* Bento Grid */}
      <div className="flex flex-col gap-8 lg:gap-10">
        {/* Hero Image - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/9] overflow-hidden bg-[var(--color-card)] rounded-2xl lg:rounded-3xl border border-[var(--color-border)]"
        >
          <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
            {images[0] ? (
              <Image
                src={images[0]}
                alt={`${project.title} hero`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[var(--color-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                  Hero Image
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Middle Row - 2 vertical images on left, description on right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Left Half - Two vertical images side by side */}
          <div className="grid grid-cols-2 gap-8 lg:gap-10">
            {/* Image 2 - Vertical */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative aspect-[9/16] overflow-hidden bg-[var(--color-card)] rounded-2xl lg:rounded-3xl border border-[var(--color-border)]"
            >
              {images[1] ? (
                <Image
                  src={images[1]}
                  alt={`${project.title} detail 1`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[var(--color-muted)] text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                    Image 2
                  </span>
                </div>
              )}
            </motion.div>

            {/* Image 3 - Vertical */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[9/16] overflow-hidden bg-[var(--color-card)] rounded-2xl lg:rounded-3xl border border-[var(--color-border)]"
            >
              {images[2] ? (
                <Image
                  src={images[2]}
                  alt={`${project.title} detail 2`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[var(--color-muted)] text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                    Image 3
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Half - Project Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-between py-2"
          >
            {/* Description - Top Left */}
            <p className="text-lg md:text-xl lg:text-2xl text-[var(--color-muted-foreground)] leading-relaxed">
              {project.description}
            </p>

            {/* Metadata - Bottom Left */}
            <div className="space-y-4 mt-8">
              {/* Stack */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 pb-4 border-b border-[var(--color-border)]">
                <span
                  className="text-xs uppercase tracking-widest text-[var(--color-muted)] min-w-[60px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Stack
                </span>
                <span
                  className="text-sm text-[var(--color-muted-foreground)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {project.tags.join(", ")}
                </span>
              </div>

              {/* Year */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 pb-4 border-b border-[var(--color-border)]">
                <span
                  className="text-xs uppercase tracking-widest text-[var(--color-muted)] min-w-[60px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Year
                </span>
                <span
                  className="text-sm text-[var(--color-muted-foreground)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {project.year}
                </span>
              </div>

              {/* View Project Link */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 pt-2 text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors group"
              >
                <span
                  className="text-sm uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  View Live Site
                </span>
                <svg
                  className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Image 4 - Full Width Landscape */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative aspect-[16/9] overflow-hidden bg-[var(--color-card)] rounded-2xl lg:rounded-3xl border border-[var(--color-border)]"
        >
          {images[3] ? (
            <Image
              src={images[3]}
              alt={`${project.title} detail 3`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[var(--color-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                Image 4
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
