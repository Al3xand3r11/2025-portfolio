"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import Image from "next/image";
import { projects, type Project } from "../lib/projects";

const hoverLabels: Record<string, string> = {
  "saturday-hike-crew": "SHC",
  "tminus-talent": "TMT",
  "seen-by-liz": "LIZ",
  "itscleoplus": "CLEO+",
};

export default function Work() {
  return (
    <section id="work" className="relative">
      <div className="container pt-16 lg:pt-24 pb-32 lg:pb-48">
        {projects.map((project, index) => (
          <ProjectCarousel key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCarousel({ project, index }: { project: Project; index: number }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = project.images || [];
  const totalSlides = 3;
  const label = hoverLabels[project.slug] || project.title;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      style={{ paddingTop: index > 0 ? "clamp(8rem, 16vw, 14rem)" : "0" }}
    >
      {/* Project Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem] font-normal tracking-tight text-[var(--color-foreground)] mb-8 lg:mb-12 uppercase"
        style={{ fontFamily: "var(--font-serif)", lineHeight: 0.95 }}
      >
        {project.title}
      </motion.h2>

      {/* Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
        {/* Image area */}
        <div className="md:col-span-8 relative">
          <AnimatePresence mode="wait">
            {currentSlide < 2 ? (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[4/3] overflow-hidden border border-[var(--color-border)]"
              >
                {images[currentSlide] ? (
                  <Image
                    src={images[currentSlide]}
                    alt={`${project.title} – slide ${currentSlide + 1}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--color-card)] flex items-center justify-center">
                    <span className="text-[var(--color-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                      Image
                    </span>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="double"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 gap-4"
              >
                {[images[2], images[3]].map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[3/4] overflow-hidden border border-[var(--color-border)] group cursor-pointer"
                  >
                    {img ? (
                      <>
                        <Image
                          src={img}
                          alt={`${project.title} – detail ${i + 1}`}
                          fill
                          className="object-cover transition-all duration-500 group-hover:brightness-[0.25]"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span
                            className="text-white text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            {label}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-[var(--color-card)]" />
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side – description + Next */}
        <div className="md:col-span-4 flex flex-col justify-between py-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm lg:text-base text-[var(--color-muted-foreground)] leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Next button */}
          <button
            onClick={nextSlide}
            className="self-end mt-12 md:mt-0 group flex items-center gap-3 hover:text-[var(--color-accent)] transition-colors"
          >
            <span
              className="text-base text-[var(--color-muted-foreground)] group-hover:text-[var(--color-accent)] transition-colors tracking-wider"
              style={{
                fontFamily: "var(--font-serif)",
                writingMode: "vertical-rl",
              }}
            >
              Next
            </span>
          </button>
        </div>
      </div>

      {/* Bottom bar: dots + project name */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-sm transition-colors duration-300 ${
                i === currentSlide
                  ? "bg-[var(--color-foreground)]"
                  : "bg-[var(--color-border)]"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <span
          className="text-sm text-[var(--color-muted-foreground)] tracking-wide"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {project.title}
        </span>
      </div>
    </motion.div>
  );
}
