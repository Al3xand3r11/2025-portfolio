"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ paddingTop: "clamp(10rem, 20vh, 16rem)", paddingBottom: "clamp(10rem, 20vh, 16rem)" }}
    >
      <div className="container">
        {/* Section label + Heading */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-16 lg:mb-24">
          <div className="md:w-1/2" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <span
                className="text-xs text-[var(--color-muted)] uppercase tracking-[0.3em]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                About Me
              </span>
              <span
                className="text-xs text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                (07)
              </span>
            </div>
            <h2
              className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[0.95] tracking-tight text-[var(--color-foreground)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span className="block">SOFTWARE</span>
              <span className="block">ENGINEER</span>
            </h2>
          </motion.div>
        </div>

        {/* Main content: large image left, staggered text right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Left - Large image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:col-span-5 relative"
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 4.2" }}>
              <motion.div style={{ y: imageY }} className="absolute inset-[-10%]">
                <Image
                  src="/images/bheadshot.webp"
                  alt="Brandon Nance"
                  fill
                  className="object-cover brightness-[0.7]"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Two staggered text columns */}
          <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14">
            {/* Middle column - starts near the vertical center of the image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col justify-start"
              style={{ paddingTop: "clamp(2rem, 12vw, 10rem)" }}
            >
              <p className="text-base lg:text-lg text-[var(--color-muted-foreground)] leading-relaxed">
                I moved to Los Angeles in 2022 to work as a software engineer at Paramount,
                3 months after graduating from Towson University with a degree in computer science.
                I grew up with a love for computers and video games and now with 5 years of experience in engineering,
                and  10 years of experience in customer service. 
              </p>
            </motion.div>

            {/* Right column - pushed down significantly */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col gap-12"
              style={{ paddingTop: "clamp(4rem, 22vw, 20rem)" }}
            >
              <p className="text-base lg:text-lg text-[var(--color-muted-foreground)] leading-relaxed">
                Today, I continue to work on Paramount&apos;s live streaming technology, mainly in typescript.
                I also work as a community ambassador at Blue Ribbon Sports, the first Nike store ever. And I am Lagree
                certified, teaching on nights and weekends in DTLA.
              </p>
              <p className="text-base lg:text-lg text-[var(--color-muted-foreground)] leading-relaxed">
                In the upcoming fall, I will be attending USC as an MBA student.
                My goal is to begin to intertwine my technical and communal passions together.
                Ultimately using those skills to educate,
                inform, and inspire others in whatever discipline they are in.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom label 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-32 lg:mt-44"
        >
          <span
            className="text-xs text-[var(--color-muted)] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Clients & Agencies I&apos;ve
          </span>
          <br />
          <span
            className="text-xs text-[var(--color-muted)] italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            worked with
          </span>
        </motion.div>
        */}
      </div>
    </section>
  );
}
