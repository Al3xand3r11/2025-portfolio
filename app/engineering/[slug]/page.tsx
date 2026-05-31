import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Community", href: "/community" },
  { label: "Engineering", href: "/engineering" },
  { label: "Lagree", href: "/lagree" },
  { label: "Contact", href: "/contact" },
];

type CaseStudy = {
  title: string;
  year: string;
  category: string;
  readTime: string;
  deliverables: string[];
  hero: string;
  images: string[];
  url: string;
  body: string[];
};

const CASE_STUDIES: Record<string, CaseStudy> = {
  "saturday-hike-crew": {
    title: "The Saturday Hike Crew",
    year: "2024",
    category: "Community Platform",
    readTime: "1 min read",
    deliverables: [
      "Web Development",
      "Dashboard Design",
      "Brand Identity",
      "Tailwind CSS",
      "TypeScript",
    ],
    hero: "/images/shc-full.png",
    images: [ "/studyimages/shc2.webp", "/studyimages/shc3.webp", "/studyimages/shc4.webp", "/studyimages/shc5.webp"],
    url: "https://thesaturdayhikecrew.com",
    body: [
      "The Saturday Hike started in late 2022 in Los Angeles as a group of friends, many new and black to the area looking for a way to get active through hiking and invite others as well. After about 6 months and a few more hikes, there were over 100 people regularly in attendance for a Saturday hike ranging from locations in Pasadena to Malibu and all in between.",
      "What became needed was a showcase for collaborations and community events that the Saturday Hike Crew has created but also system design and registration capabilities for upcoming hikes as well.",
      "Gathering insight, it was determined early that even with consistent attendance, most often they were first timers and hard to garner a returning audience to the hikes. The SHC site allowed us to gain more information on why that is, work in conjunction with Eventbrite, and build connections with other brands like Yeti looking to support the Saturday Hike Crew mission.",
    ],
  },
  "seen-by-liz": {
    title: "Seen By Liz",
    year: "2025",
    category: "Portfolio Website",
    readTime: "3 min read",
    deliverables: [
      "Visual Identity",
      "Web Development",
      "Art Direction",
      "Photography",
      "Next.js",
    ],
    hero: "/images/sbl-full.png",
    images: ["/studyimages/sbl1.webp", "/studyimages/sbl2.webp", "/studyimages/sbl3.webp", "/studyimages/sbl4.webp"],
    url: "https://seenbyliz.com",
    body: [
      "Seen By Liz is a personal portfolio for a Los Angeles based photographer, focusing on events, landscape and portrait photography. Liz wanted to showcase her work and accept new clients. Utilizing images from various events showcasing her malleability when it comes to capturing moments and we wanted the site to reflect that.",
      "Intentional and concise on the wording, the focus was image presentation, enough to captivate her audience and lead to exploration of the rest of the site. Bento boxes of images highlighting different work areas showcased her versatility.",
      "A simple stunning about section directly after the landing page draws you into meeting the creator behind the art users have been introduced to, and finally a contact form accompanied by a dashboard to connect her with prospective clients.",
    ],
  },
  "moments-of-metanoia": {
    title: "Moments of Metanoia",
    year: "2025",
    category: "Artist Website",
    readTime: "4 min read",
    deliverables: [
      "Brand Strategy",
      "Visual Identity",
      "Web Development",
      "WebGL",
      "Entertainment",
    ],
    hero: "/images/metanoia-full.png",
    images: ["/studyimages/mm2.webp", "/studyimages/mm3.webp"],
    url: "https://itscleoplus.com",
    body: [
      "Metanoia is a web application built for the release of a music video from artist Cleo Plus to begin the 2026 year. The inspiration of the Metanoia site, song and video came from a place of cultivating community and driving conversations about transformative points in life leading to breakthroughs, whether through the creative process or just life in general.",
      "In theory, the system design and interactive elements within the application were not very extensive. The focus quickly became the design, sound and overall feeling a user will experience when accessing the application. The project\u2019s landing page itself underwent hundreds of rewrites to align with the artist on the design of the landing page, specifically on desktop. The goal became to segment the two experiences based on the viewing capacity of the user and the goal for us together became to serve those unique experiences in an efficient way so users are met with content quickly.",
      "On desktop, massive inspiration from the website Hyperdreamz built by the company Naughtyduck that creates WebGL components and animations leading to the ripple effects through the landing page on scroll. Converting her image to a duo-tone hex canvas that broke each pixel down to a single particle that began to interact with the mouse. Alternatively, mobile users would not have that scrolling experience without a mouse and for those users a carousel of mini videos of the artist appeared before users could enter the screen, like a visualizer.",
      "Overall, an insightful and challenging build focused on intentional design, the implementation of sound, physics and video integration. Building Moments of Metanoia created a space focused on visual excellence accompanied by an intentional design process. Around mock 20 or so, the thinking was that there was no way to improve the way images have been manipulated and videos have been integrated but the constant process of iteration allowed us to push past many blockers to make a beautiful application.",
    ],
  },
  "bowie-forward": {
    title: "Bowie Forward",
    year: "2026",
    category: "Community Platform",
    readTime: "3 min read",
    deliverables: [
      "Web Development",
      "TypeScript",
      "Community",
      "Next.js",
      "Tailwind CSS",
    ],
    hero: "/images/bowie-full.png",
    images: ["/studyimages/bf1.webp", "/studyimages/bf2.webp", "/studyimages/bf3.webp"],
    url: "https://bowieforward.com",
    body: [
      "Bowie Forward is a community initiative and engagement application, database and dashboard for a city within Prince George\u2019s County, Maryland.",
      "Originally, this application\u2019s intention was a mayoral campaign for a candidate within the special election for 2026 named Remington Tennessee. Working with Remington closely in the inception phases of the campaign, the brainstorming and iteration phases, and eventually the reflection stage in hindsight. Overall, the experience allowed us to gain a temperature within the community, discovering their needs, how they want to be informed and most importantly to them, ways to engage their local youth.",
      "The transition of Bowie Forward is in a beta stage. Focusing on the insights we gathered to build out a communal hub for residents in the Bowie area and surrounding Prince George\u2019s County.",
      "The initial intent was a warm and inviting experience on mobile and desktop. A clear and concise communication of mayoral policies, upcoming events communication and an interactive map to educate people on their local polling places. Those elements became the building blocks for the transition with a goal of offering perspectives and events held by local leaders and the city, upcoming events to engage the youth, and interactive elements to make the civic process easier to participate in.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];
  if (!study) notFound();

  const otherStudies = Object.entries(CASE_STUDIES)
    .filter(([key]) => key !== slug)
    .map(([key, val]) => ({ slug: key, ...val }));

  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "var(--font-mono)",
      }}
    >
      {/* Nav */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: 24,
        }}
      >
        <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: "#000",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontFamily: "var(--font-mono)",
                textDecoration:
                  item.label === "Engineering" ? "underline" : "none",
                textUnderlineOffset: "4px",
                transition: "opacity 0.2s",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="https://www.linkedin.com/in/bnance1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: "#000", transition: "opacity 0.2s" }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://github.com/Al3xand3r11"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: "#000", transition: "opacity 0.2s" }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </header>

      <hr style={{ border: "none", borderTop: "1px solid #000", margin: "0 24px" }} />

      {/* Three-column title section */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr 1fr",
          gap: 32,
          padding: "48px 24px 56px",
          alignItems: "start",
        }}
      >
        {/* Left — metadata */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <span
              style={{
                display: "block",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#999",
                marginBottom: 4,
              }}
            >
              Year
            </span>
            <span style={{ fontSize: 12, fontWeight: 500 }}>{study.year}</span>
          </div>
          <div>
            <span
              style={{
                display: "block",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#999",
                marginBottom: 4,
              }}
            >
              Category
            </span>
            <span style={{ fontSize: 12, fontWeight: 500 }}>{study.category}</span>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "#666" }}>{study.readTime}</span>
          </div>
        </div>

        {/* Center — title */}
        <div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {study.title}
          </h1>
          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#000",
              textDecoration: "none",
              marginTop: 20,
              transition: "opacity 0.2s",
            }}
          >
            Visit Site
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>

        {/* Right — deliverables */}
        <div>
          <span
            style={{
              display: "block",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#999",
              marginBottom: 8,
            }}
          >
            Deliverables
          </span>
          {study.deliverables.map((d) => (
            <span
              key={d}
              style={{
                display: "block",
                fontSize: 12,
                lineHeight: 1.8,
                fontWeight: 500,
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </section>

      {/* Hero image */}
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Image
            src={study.hero}
            alt={study.title}
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "top" }}
            sizes="800px"
          />
        </div>
      </div>

      {/* Project images */}
      {study.images.length > 1 && (
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            gap: 48,
            marginTop: 48,
          }}
        >
          {study.images.map((img, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                overflow: "hidden",
                backgroundColor: "#f0f0f0",
              }}
            >
              <Image
                src={img}
                alt={`${study.title} detail ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="800px"
              />
            </div>
          ))}
        </div>
      )}

      {/* Body text */}
      <section
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "72px 24px",
          fontSize: 24,
          lineHeight: 1.9,
          color: "#222",
        }}
      >
        {study.body.map((paragraph, i) => (
          <p
            key={i}
            style={{
              marginBottom: i < study.body.length - 1 ? 36 : 0,
            }}
          >
            {paragraph}
          </p>
        ))}
      </section>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #000", margin: "0 24px" }} />

      {/* More case studies */}
      <section style={{ padding: "64px 24px 80px" }}>
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 900,
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            marginBottom: 48,
          }}
        >
          More
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {otherStudies.map((other) => (
            <Link
              key={other.slug}
              href={`/engineering/${other.slug}`}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                  backgroundColor: "#f0f0f0",
                  marginBottom: 16,
                }}
              >
                <Image
                  src={other.hero}
                  alt={other.title}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#999",
                  marginBottom: 4,
                }}
              >
                Project
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  lineHeight: 1.4,
                }}
              >
                {other.title}
              </p>
              <p
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#666",
                  marginTop: 8,
                }}
              >
                {other.deliverables.slice(0, 3).join(", ")}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 24,
        }}
      >
        <span
          style={{
            color: "#000",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-mono)",
          }}
        >
          Brandon Alexander
        </span>
      </footer>
    </main>
  );
}
