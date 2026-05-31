"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "var(--font-mono)",
      }}
    >
      <PageHeader activeLabel="About" />

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #000",
          margin: "0 24px",
        }}
      />

      {isMobile ? (
        <section style={{ padding: "48px 24px 80px" }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 13, lineHeight: 1.8 }}
          >
            <p>
              My name is Brandon Nance. I am a Software Engineer, Lagree instructor and community ambassador in Los Angeles. Approaching 5 years
              of experience leading engineering work at <strong>PARAMOUNT</strong>, contributing to live streaming infrastructure
              serving millions, and continuing to build personal projects to accelerate growth for members of my community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              position: "relative",
              aspectRatio: "3 / 4",
              maxHeight: "50vh",
              overflow: "hidden",
              marginTop: 32,
            }}
          >
            <Image
              src="/images/bheadshot.webp"
              alt="Brandon Nance"
              fill
              priority
              style={{ objectFit: "cover", filter: "brightness(0.75)" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
              fontSize: 13,
              lineHeight: 1.8,
              marginTop: 32,
            }}
          >
            <p>
              I graduated from Towson University in 2022 with a degree in computer science. With 5 years of engineering
              experience and 10 years in customer service, I bring a unique blend of
              technical depth and human-centered thinking to every project.
            </p>

            <p>
              In the fall of 2026, I will be attending USC Marshall School of business in the fall
              with the goal of intertwining my technical knowledge and customer service experience on
              top of the foundational business concepts I will learn in school to continue to connect communities in need to vital resources.
            </p>
          </motion.div>
        </section>
      ) : (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 7fr",
            gap: 64,
            padding: "48px 24px 80px",
            width: "100%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "relative",
              aspectRatio: "3 / 4",
              maxHeight: "60vh",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/bheadshot.webp"
              alt="Brandon Nance"
              fill
              priority
              style={{ objectFit: "cover", filter: "brightness(0.75)" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 32,
              fontSize: 13,
              lineHeight: 1.8,
            }}
          >
            <p>
              Brandon Nance is a software engineer and community builder in Los Angeles.
              Throughout his career, he has focused on building performant, scalable systems
              while fostering connection in the communities around him. He has led engineering
              work at <strong>PARAMOUNT</strong>, contributed to live streaming infrastructure
              serving millions, and continues to push the boundaries of web technology.
            </p>

            <p>
              He moved to Los Angeles in 2022, three months after graduating from Towson
              University with a degree in computer science. With 5 years of engineering
              experience and 10 years in customer service, he brings a unique blend of
              technical depth and human-centered thinking to every project.
            </p>

            <p>
              Today, Brandon works on Paramount&apos;s live streaming technology in TypeScript,
              serves as a community ambassador at Blue Ribbon Sports (the first Nike store
              ever), and teaches Lagree fitness on nights and weekends in DTLA. He will be
              attending USC in the fall to pursue his masters.
            </p>
          </motion.div>
        </section>
      )}

      <footer
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 24,
        }}
      >
        <Link
          href="/"
          style={{
            color: "#000",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-mono)",
            textDecoration: "none",
          }}
        >
          Brandon Alexander
        </Link>
      </footer>
    </main>
  );
}
