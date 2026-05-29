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
};

const CASE_STUDIES: Record<string, CaseStudy> = {
  "saturday-hike-crew": {
    title: "The Saturday Hike Crew",
    year: "2024",
    category: "Community Platform",
    readTime: "4 min read",
    deliverables: [
      "Web Development",
      "Dashboard Design",
      "Brand Identity",
      "Tailwind CSS",
      "TypeScript",
    ],
    hero: "/images/shc-full.png",
    images: ["/images/shc1.webp", "/images/shc2.webp", "/images/shc3.webp", "/images/shc4.webp"],
    url: "https://thesaturdayhikecrew.com",
  },
  "seen-by-liz": {
    title: "Seen By Liz",
    year: "2024",
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
    images: ["/images/caro1.webp", "/images/sbl2.webp", "/images/sbl3.webp", "/images/sbl4.webp"],
    url: "https://seenbyliz.com",
  },
  "moments-of-metanoia": {
    title: "Moments of Metanoia",
    year: "2024",
    category: "Artist Website",
    readTime: "3 min read",
    deliverables: [
      "Brand Strategy",
      "Visual Identity",
      "Web Development",
      "WebGL",
      "Entertainment",
    ],
    hero: "/images/metanoia-full.png",
    images: ["/images/Mia2.webp", "/images/mm2.webp", "/images/mm3.webp", "/images/mm4.webp"],
    url: "https://itscleoplus.com",
  },
  "bowie-forward": {
    title: "Bowie Forward",
    year: "2025",
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
    images: ["/images/bowie-full.png"],
    url: "https://bowieforward.com",
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
          sizes="100vw"
        />
      </div>

      {/* Body text */}
      <section
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "64px 24px",
          fontSize: 15,
          lineHeight: 1.85,
          color: "#222",
        }}
      >
        <p style={{ marginBottom: 32 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p style={{ marginBottom: 32 }}>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste
          natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
          beatae vitae dicta sunt explicabo.
        </p>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
          sit amet, consectetur, adipisci velit.
        </p>
      </section>

      {/* Image grid */}
      {study.images.length > 1 && (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: study.images.length >= 4 ? "1fr 1fr" : "1fr 1fr",
            gap: 4,
            padding: "0 24px",
          }}
        >
          {study.images.slice(0, 4).map((img, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                aspectRatio: "4 / 3",
                overflow: "hidden",
                backgroundColor: "#f0f0f0",
              }}
            >
              <Image
                src={img}
                alt={`${study.title} detail ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </section>
      )}

      {/* Second body text block */}
      <section
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "64px 24px",
          fontSize: 15,
          lineHeight: 1.85,
          color: "#222",
        }}
      >
        <p style={{ marginBottom: 32 }}>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et
          quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga.
        </p>
        <p>
          Et harum quidem rerum facilis est et expedita distinctio. Nam libero
          tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
          minus id quod maxime placeat facere possimus, omnis voluptas assumenda
          est, omnis dolor repellendus.
        </p>
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
