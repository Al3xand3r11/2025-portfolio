"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.3,
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-var(--header-height))] py-12">
          {/* Left side - Text content */}
          <div>
            {/* Main headline */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span className="block text-[var(--color-foreground)]">Brandon</span>
              <span className="block text-[var(--color-accent)] italic">Nance</span>
            </motion.h1>

            {/* Decorative line */}
            <motion.div
              variants={lineVariants}
              className="h-px bg-[var(--color-border)] my-8 md:my-10 origin-left max-w-md"
            />

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[var(--color-muted-foreground)] leading-relaxed max-w-md mb-8"
            >
              Software engineer crafting digital experiences that bring people together. 
              From live streaming at Paramount to community platforms for runners and hikers.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8 text-xs uppercase tracking-wider"
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
            </motion.div>
          </div>

          {/* Right side - Hero image */}
          <motion.div
            variants={imageVariants}
            className="relative aspect-[3/4] lg:aspect-[4/5] max-w-lg mx-auto lg:mx-0 lg:ml-auto"
          >
            {/* Corner brackets */}
            <span className="absolute -top-3 -left-3 w-8 h-8 border-t border-l border-[var(--color-accent)] z-10" />
            <span className="absolute -top-3 -right-3 w-8 h-8 border-t border-r border-[var(--color-accent)] z-10" />
            <span className="absolute -bottom-3 -left-3 w-8 h-8 border-b border-l border-[var(--color-accent)] z-10" />
            <span className="absolute -bottom-3 -right-3 w-8 h-8 border-b border-r border-[var(--color-accent)] z-10" />
            
            {/* Image container */}
            <div className="relative w-full h-full rounded-sm overflow-hidden bg-[var(--color-card)]">
              <Image
                src="/images/bnancehero.jpg"
                alt="Brandon Nance"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/20 to-transparent" />
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
      </motion.div>
    </section>
  );
}
