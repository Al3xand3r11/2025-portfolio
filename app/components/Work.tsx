"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "../lib/projects";

export default function Work() {
  return (
    <section id="work" className="py-[var(--section-padding)]">
      <div className="container mb-16">
        {/* Section header with split typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-baseline gap-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[var(--color-foreground)]">
            Recent
          </h2>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl italic text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Projects
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-[var(--color-muted-foreground)] max-w-xl"
        >
          Full-stack applications built with modern technologies. Each project focuses on 
          user experience and solving real problems for communities and businesses.
        </motion.p>
      </div>

      {/* Project cards */}
      <div className="border-b border-[var(--color-border)]">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

