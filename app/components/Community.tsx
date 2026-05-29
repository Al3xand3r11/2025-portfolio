"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const communities = [
  {
    title: "Sunday Runday LA",
    description:
      "DTLA based running club hosting weekly runs, race prep and community building events. What started small has grown into a Nike sponsored running club. From welcoming new runners in DTLA to preparing for the LA Marathon, all the way to cultivating routes and running from LA to Vegas, we have built a community for all levels.",
    image: "/images/sdrdhero1.webp",
    role: "Crew Captain",
  },
  {
    title: "Nike: After Dark LA 2025",
    description:
      "Stretched, paced and curated music for the Nike After Dark LA track night events leading up to the half marathon. A twice weekly cadence often hosting over 300 runners a night. We cultivated a community of runners, many first timers to track workouts, prepared them for their race and introduced them to lifelong friends in the process.",
    image: "/images/afterdark1.webp",
    role: "Community Ambassador",
  },
  {
    title: "The Saturday Hike Crew",
    description:
      "Beyond building the website, I'm an active member of this hiking community. Often at the back of hikes, ensuring everyone finishes safely. What started as a small group of friends quickly ballooned into a community of over 100 runners with each monthly hike.",
    image: "/images/shcgroup.webp",
    role: "Crew Captain & Engineer",
  },
];

export default function Community() {
  return (
    <section style={{ padding: "48px 24px 80px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            fontFamily: "var(--font-display)",
            maxWidth: 900,
          }}
        >
          Community
        </h1>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginTop: 24,
            fontFamily: "var(--font-mono)",
            color: "#666",
            maxWidth: 600,
          }}
        >
          I have only become a better engineer by touching grass consistently.
          The communal work below are examples of the beginning of the
          intertwining I plan to incorporate into my work after graduation.
        </p>
      </motion.div>

      <div style={{ marginTop: 64 }}>
        {communities.map((community, index) => (
          <motion.article
            key={community.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              borderTop: "1px solid #000",
              paddingTop: 24,
              paddingBottom: 48,
            }}
          >
            <div
              style={{
                paddingRight: 24,
                borderRight: "1px solid #000",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#666",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {community.role}
              </span>

              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.01em",
                  marginTop: 12,
                }}
              >
                {community.title}
              </h3>

              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.8,
                  color: "#333",
                  marginTop: 16,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {community.description}
              </p>
            </div>

            <div
              style={{
                paddingLeft: 24,
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <Image
                  src={community.image}
                  alt={community.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
