"use client";

import { motion } from "framer-motion";

const additionalProjects = [
  { title: "TMinus Talent", href: "https://tminustalent.com" },
  { title: "Python Image Converter", href: "https://github.com/Al3xand3r11/python-image-converter/tree/main" },
  { title: "Sunday Runday LA", href: "https://www.sundayrundayla.com/" },
  { title: "Food Desert Finder", href: "https://github.com/Al3xand3r11/food-desert-fixer" },
];

export default function Additional() {
  return (
    <section className="py-40 md:py-56" style={{ paddingTop: '250px' }}>
      <h3
        className="text-xs tracking-[0.2em] uppercase text-[var(--color-muted)] px-6 md:px-10 mb-12"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Additional Projects
      </h3>

      {additionalProjects.map((ap, i) => (
        <motion.div
          key={ap.title}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        >
          <div className="border-t border-white" />
          <a
            href={ap.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-6 md:px-10 py-8 md:py-10 group hover:bg-white/[0.03] transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-accent-warm)] transition-colors">
              {ap.title}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[var(--color-foreground)] group-hover:text-[var(--color-accent-warm)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-6 -rotate-45"
            >
              <path d="M5 12h14M13 5l6 7-6 7" />
            </svg>
          </a>
          {i === additionalProjects.length - 1 && <div className="border-t border-white" />}
        </motion.div>
      ))}
    </section>
  );
}
