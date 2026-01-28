"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "../lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="grid lg:grid-cols-2 gap-0 min-h-[500px] lg:min-h-[600px] border-t border-[var(--color-border)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Panel - Project Info */}
      <div className="bg-[var(--color-background)] p-8 lg:p-12 flex flex-col justify-between order-2 lg:order-1">
        <div>
          {/* Year */}
          <span
            className="text-xs text-[var(--color-muted)] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {project.year}
          </span>

          {/* Title */}
          <h3
            className="text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-8 max-w-md">
            {project.description}
          </p>

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
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
          >
            <span className="font-medium">Visit Site</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
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

          <Link
            href={`/projects/${project.slug}`}
            className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors text-sm"
          >
            View Case Study →
          </Link>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="relative bg-[var(--color-card)] order-1 lg:order-2 min-h-[300px] lg:min-h-0 overflow-hidden">
        {/* Corner brackets that animate on hover */}
        <motion.span
          className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[var(--color-accent)] z-10"
          animate={{ 
            width: isHovered ? 24 : 16, 
            height: isHovered ? 24 : 16,
            opacity: isHovered ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[var(--color-accent)] z-10"
          animate={{ 
            width: isHovered ? 24 : 16, 
            height: isHovered ? 24 : 16,
            opacity: isHovered ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[var(--color-accent)] z-10"
          animate={{ 
            width: isHovered ? 24 : 16, 
            height: isHovered ? 24 : 16,
            opacity: isHovered ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[var(--color-accent)] z-10"
          animate={{ 
            width: isHovered ? 24 : 16, 
            height: isHovered ? 24 : 16,
            opacity: isHovered ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Loading state */}
        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-card)]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[var(--color-border)] border-t-[var(--color-accent)] rounded-full animate-spin" />
              <span className="text-xs text-[var(--color-muted)]">Loading preview...</span>
            </div>
          </div>
        )}

        {/* Live site iframe */}
        <motion.div
          className="absolute inset-8 rounded-lg overflow-hidden shadow-2xl"
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <iframe
            src={project.url}
            title={`${project.title} preview`}
            className="w-full h-full border-0 bg-white"
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
            sandbox="allow-scripts allow-same-origin"
          />
        </motion.div>
      </div>
    </motion.article>
  );
}

