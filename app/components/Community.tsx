"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const communities = [
  {
    title: "Sunday Runday LA",
    description:
      "DTLA based running club hosting weekly runs, race prep and community building events. What started small has grown into a Nike sponsored running club. From welcoming new runners in DTLA to preparing for the LA Marathon, all the way to cultivatingnroutes and running from LA to Vegas, we have built a community for all levels.",
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
    <section id="community" className="pb-32 lg:pb-48" style={{ paddingTop: '250px' }}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 lg:mb-32"
        >
          <div className="flex flex-wrap items-baseline gap-4 mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[var(--color-foreground)]">
              The
            </h2>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl italic text-[var(--color-accent)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Outdoors
            </h2>
          </div>
          <p className="text-[var(--color-muted-foreground)] max-w-xl">
            I have only become a better engineer by touching grass consistently. The communal work below are examples of the beginning of the intertwining I plan to incorporate into my work after graduation.
          </p>
        </motion.div>

        {/* Community cards - editorial layout */}
        <div className="space-y-32 lg:space-y-40">
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

