"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Projects Deployed", value: "3+" },
  { label: "Companies", value: "Apple, Paramount, Nike" },
  { label: "Based in", value: "Los Angeles" },
  { label: "Focus", value: "Community Tech" },
];

export default function StatsBar() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 lg:py-20 border-y border-[var(--color-border)] bg-[var(--color-card)]"
    >
      <div className="container">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col gap-1"
            >
              <span className="text-xs text-[var(--color-muted)] uppercase tracking-widest">
                {stat.label}
              </span>
              <span className="text-sm text-[var(--color-foreground)]">
                {stat.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

