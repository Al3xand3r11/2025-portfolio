"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Hero() {
  return (
    <section className="h-screen w-full relative overflow-hidden">
      {/* Background image */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0"
      >
        <Image
          src="/images/bnancehero.jpg"
          alt="Brandon Nance"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
      </motion.div>

      {/* Content overlay */}
      <motion.div
        className="relative z-10 h-full flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main content area - pushed to bottom */}
        <div className="flex-1" />

        {/* Bottom section with large typography 
        <div className="container pb-24">
          <div className="flex justify-between items-end">
            {/* Left side - Name and title 
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <span
                className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                01
              </span>
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] tracking-tight text-[var(--color-foreground)]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <span className="block">LOS</span>
                <span className="block">ANGELES</span>
              </h1>
            </motion.div>

            {/* Right side - Secondary title 
            <motion.div
              variants={itemVariants}
              className="hidden md:flex flex-col gap-2 text-right"
            >
              <span
                className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                02
              </span>
              <h2
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] tracking-tight text-[var(--color-foreground)]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <span className="block">SOFTWARE</span>
                <span className="block">ENGINEER</span>
              </h2>
            </motion.div>
          </div>
        </div>
        */}

        {/* Scroll indicator - centered at bottom */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span
            className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-[var(--color-accent)] to-transparent"
          />
        </motion.div>

        {/* Version/date info in corner */}
        <motion.div
          variants={itemVariants}
          className="absolute top-[calc(var(--header-height)+1rem)] right-[var(--container-padding)] text-right hidden lg:block"
        >
          <span
            className="text-xs text-[var(--color-muted-foreground)] block"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            V1.0
          </span>
          <span
            className="text-xs text-[var(--color-muted-foreground)] block"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {new Date().getFullYear()}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
