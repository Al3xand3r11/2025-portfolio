"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const communities = [
  {
    title: "Sunday Run Day",
    description:
      "Weekly running community in Los Angeles focused on building connections through movement. From casual jogs to marathon training, bringing runners of all levels together.",
    image: "/images/sdrdhero1.webp",
    role: "Organizer & Participant",
  },
  {
    title: "Nike Running Club",
    description:
      "Part of Nike's LA running community, participating in coached runs and marathon training programs. Building endurance and community one mile at a time.",
    image: "/images/IMG_0231.webp",
    role: "Ambassador",
  },
  {
    title: "The Saturday Hike Crew",
    description:
      "Beyond building the website, I'm an active member of this hiking community. Weekly adventures exploring LA's trails and connecting with fellow outdoor enthusiasts.",
    image: "/images/shcgroup.webp",
    role: "Member & Developer",
  },
];

export default function Community() {
  return (
    <section id="community" className="py-32 lg:py-48">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-wrap items-baseline gap-4 mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[var(--color-foreground)]">
              Building
            </h2>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl italic text-[var(--color-accent)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Community
            </h2>
          </div>
          <p className="text-[var(--color-muted-foreground)] max-w-xl">
            Technology is just a tool. What matters is the connections we build. 
            Here&apos;s how I bring people together beyond the screen.
          </p>
        </motion.div>

        {/* Community cards - editorial layout */}
        <div className="space-y-24">
          {communities.map((community, index) => (
            <motion.article
              key={community.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative aspect-[4/3] rounded-lg overflow-hidden bg-[var(--color-card)] ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                {/* Corner brackets */}
                <span className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[var(--color-accent)] z-10" />
                <span className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[var(--color-accent)] z-10" />
                <span className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[var(--color-accent)] z-10" />
                <span className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[var(--color-accent)] z-10" />

                <Image
                  src={community.image}
                  alt={community.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}>
                {/* Role tag */}
                <span
                  className="text-xs text-[var(--color-muted)] uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {community.role}
                </span>

                {/* Title */}
                <h3
                  className="text-3xl md:text-4xl mt-4 mb-6"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {community.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                  {community.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Photo grid 
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            "/images/sdrdvegas1.webp",
            "/images/sdrdvegas2.webp",
            "/images/sdrdvegas3.webp",
            "/images/sdrdvegas4.webp",
          ].map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-[var(--color-card)]"
            >
              <Image src={image} alt="Community event" fill className="object-cover" />
            </motion.div>
          ))}
        </motion.div>
        */}
      </div>
    </section>
  );
}

