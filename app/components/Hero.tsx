"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.6,
    },
  },
};

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-background)] to-[var(--color-card)]" />

      <motion.div
        className="container relative z-10 pt-[var(--header-height)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto">
          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span className="block text-[var(--color-foreground)]">Building</span>
            <span className="block text-[var(--color-accent)] italic">community</span>
            <span className="block text-[var(--color-foreground)]">through code</span>
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            variants={lineVariants}
            className="h-px bg-[var(--color-border)] my-8 md:my-12 origin-left"
          />

          {/* Subtext */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[var(--color-muted-foreground)] leading-relaxed"
            >
              Software engineer crafting digital experiences that bring people together. 
              From live streaming at Paramount to community platforms for runners and hikers.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              {/* Stats */}
              <div
                className="flex flex-wrap gap-6 text-xs uppercase tracking-wider"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <div>
                  <span className="text-[var(--color-muted)]">Projects</span>
                  <span className="block text-[var(--color-foreground)] text-lg mt-1">3+</span>
                </div>
                <div>
                  <span className="text-[var(--color-muted)]">Experience</span>
                  <span className="block text-[var(--color-foreground)] text-lg mt-1">Apple, Paramount, Nike</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-[var(--color-muted)] uppercase tracking-widest">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-[var(--color-accent)] to-transparent"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

