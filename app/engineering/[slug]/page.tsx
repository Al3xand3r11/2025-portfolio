import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FadeIn, FadeInView } from "../../components/MotionWrapper";
import PageHeader from "../../components/PageHeader";

type CaseStudy = {
  title: string;
  year: string;
  category: string;
  readTime: string;
  deliverables: string[];
  hero: string;
  video: string;
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
    video: "/videos/shcvid.mp4",
    images: [
      "/studyimages/shc2.webp",
      "/studyimages/shc3.webp",
      "/studyimages/shc4.webp",
      "/studyimages/shc5.webp",
    ],
    url: "https://thesaturdayhikecrew.com",
    body: [
      "The Saturday Hike started in late 2022 in Los Angeles as a group of friends, many new and black to the area looking for a way to get active through hiking and invite others as well. After about 6 months and a few more hikes, there were over 100 people regularly in attendance for a Saturday hike ranging from locations in Pasadena to Malibu and all in between.",
      "What became needed was a showcase for collaborations and community events that the Saturday Hike Crew has created but also system design and registration capabilities for upcoming hikes as well.",
      "Gathering insight, it was determined early that even with consistent attendance, most often they were first timers and hard to garner a returning audience to the hikes. The SHC site allowed us to gain more information on why that is, work in conjunction with Eventbrite, and build connections with other brands like Yeti looking to support the Saturday Hike Crew mission.",
    ],
  },
  "tminus-talent": {
    title: "TMinus Talent",
    year: "2025",
    category: "Talent Platform",
    readTime: "2 min read",
    deliverables: [
      "Web Development",
      "Brand Identity",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    hero: "/studyimages/tmt1.webp",
    video: "/videos/tmtvid.mp4",
    images: [
      "/studyimages/tmt1.webp",
      "/studyimages/tmt2.webp",
      "/studyimages/tmt3.webp",
      "/studyimages/tmt4.webp",
    ],
    url: "https://tminustalent.com",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
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
    video: "/videos/mmvid.mp4",
    images: ["/studyimages/mm2.webp", "/studyimages/mm3.webp"],
    url: "https://itscleoplus.com",
    body: [
      "Metanoia is a web application built for the release of a music video from artist Cleo Plus to begin the 2026 year. The inspiration of the Metanoia site, song and video came from a place of cultivating community and driving conversations about transformative points in life leading to breakthroughs, whether through the creative process or just life in general.",
      "In theory, the system design and interactive elements within the application were not very extensive. The focus quickly became the design, sound and overall feeling a user will experience when accessing the application. The project\u2019s landing page itself underwent hundreds of rewrites to align with the artist on the design of the landing page, specifically on desktop. The goal became to segment the two experiences based on the viewing capacity of the user and the goal for us together became to serve those unique experiences in an efficient way so users are met with content quickly.",
      "On desktop, massive inspiration from the website Hyperdreamz built by the company Naughtyduck that creates WebGL components and animations leading to the ripple effects through the landing page on scroll. Converting her image to a duo-tone hex canvas that broke each pixel down to a single particle that began to interact with the mouse. Alternatively, mobile users would not have that scrolling experience without a mouse and for those users a carousel of mini videos of the artist appeared before users could enter the screen, like a visualizer.",
      "Overall, an insightful and challenging build focused on intentional design, the implementation of sound, physics and video integration. Building Moments of Metanoia created a space focused on visual excellence accompanied by an intentional design process. Around mock 20 or so, the thinking was that there was no way to improve the way images have been manipulated and videos have been integrated but the constant process of iteration allowed us to push past many blockers to make a beautiful application.",
    ],
  },
  "egle-zalpys": {
    title: "Egle Zalpys Portfolio",
    year: "2026",
    category: "Portfolio Website",
    readTime: "2 min read",
    deliverables: [
      "Web Development",
      "Visual Identity",
      "Next.js",
      "TypeScript",
      "Motion",
    ],
    hero: "/studyimages/ez1.webp",
    video: "/videos/ezvid.mp4",
    images: [
      "/studyimages/ez1.webp",
      "/studyimages/ez2.webp",
      "/studyimages/ez3.webp",
      "/studyimages/ez4.webp",
    ],
    url: "https://portfolio.eglezalpys.com",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
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

  const index = Object.keys(CASE_STUDIES).indexOf(slug) + 1;
  const paddedIndex = String(index).padStart(2, "0");

  const otherStudies = Object.entries(CASE_STUDIES)
    .filter(([key]) => key !== slug)
    .map(([key, val]) => ({ slug: key, ...val }));

  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "var(--page-bg)",
        color: "var(--page-fg)",
        fontFamily: "var(--font-mono)",
      }}
    >
      {/* Hero: header + title/meta + video */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100svh",
          paddingBottom: 24,
        }}
      >
        <PageHeader activeLabel="Engineering" />

        <FadeIn y={20}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              padding: "24px 24px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    color: "var(--page-muted-2)",
                  }}
                >
                  ({paddedIndex})
                </span>
                <h1
                  style={{
                    marginTop: 8,
                    fontSize: "clamp(36px, 6vw, 80px)",
                    fontWeight: 800,
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    fontFamily: "var(--font-display)",
                    textTransform: "uppercase",
                    margin: "8px 0 0",
                  }}
                >
                  {study.title}
                </h1>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "var(--page-muted-2)",
                  textAlign: "right",
                }}
              >
                <span style={{ color: "var(--page-muted)" }}>{study.category}</span>
                <span>{study.deliverables.slice(0, 3).join(" · ")}</span>
                <span>{study.year}</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} y={24} style={{ flex: 1, display: "flex", minHeight: 0, padding: "24px 24px 0" }}>
          <div
            style={{
              position: "relative",
              flex: 1,
              minHeight: "45vh",
              overflow: "hidden",
              borderRadius: 6,
              backgroundColor: "var(--page-surface)",
            }}
          >
            <video
              src={study.video}
              poster={study.hero}
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </FadeIn>
      </section>

      {/* Description — full viewport width */}
      <FadeInView>
        <section style={{ padding: "72px 24px" }}>
          <div
            style={{
              display: "grid",
              gap: 48,
              borderTop: "1px solid color-mix(in srgb, var(--page-fg) 20%, transparent)",
              paddingTop: 40,
            }}
          >
            {study.body.map((paragraph, i) => (
              <div key={i}>
                <h2
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    color: "var(--page-muted-2)",
                    margin: 0,
                  }}
                >
                  Section {String(i + 1).padStart(2, "0")}
                </h2>
                <p
                  style={{
                    marginTop: 20,
                    fontSize: "clamp(18px, 2.2vw, 24px)",
                    lineHeight: 1.7,
                    color: "var(--page-body)",
                    maxWidth: "none",
                    width: "100%",
                  }}
                >
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeInView>

      {/* Gallery */}
      {study.images.length > 0 && (
        <FadeInView>
          <section style={{ padding: "0 24px 72px" }}>
            <div
              style={{
                columns: 2,
                columnGap: 16,
              }}
            >
              {study.images.map((img, i) => (
                <div
                  key={i}
                  style={{
                    breakInside: "avoid",
                    marginBottom: 16,
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 10",
                    overflow: "hidden",
                    borderRadius: 6,
                    backgroundColor: "var(--page-surface)",
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
            </div>
          </section>
        </FadeInView>
      )}

      {/* More */}
      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--page-fg)",
          margin: "0 24px",
        }}
      />

      <FadeInView>
        <section style={{ padding: "64px 24px 80px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 48,
              gap: 24,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 900,
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              More
            </h2>
            <Link
              href="/engineering"
              style={{
                fontSize: 12,
                color: "var(--page-muted)",
                textDecoration: "none",
              }}
            >
              ← Back to all work
            </Link>
          </div>

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
                style={{ textDecoration: "none", color: "var(--page-fg)" }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4 / 3",
                    overflow: "hidden",
                    backgroundColor: "var(--page-surface)",
                    marginBottom: 16,
                    borderRadius: 6,
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
                    color: "var(--page-muted-2)",
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
              </Link>
            ))}
          </div>
        </section>
      </FadeInView>

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
            color: "var(--page-fg)",
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
