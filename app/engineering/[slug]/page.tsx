import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FadeInView } from "../../components/MotionWrapper";
import PageHeader from "../../components/PageHeader";
import { CASE_STUDIES, CASE_STUDY_SLUGS } from "../../lib/caseStudies";
import CaseStudyBackend from "./CaseStudyBackend";
import CaseStudyBento from "./CaseStudyBento";
import CaseStudyIntro from "./CaseStudyIntro";
import CaseStudyStatement from "./CaseStudyStatement";
import styles from "./caseStudy.module.css";

export { CASE_STUDY_SLUGS };

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
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

  const accent = { "--cs-accent": `var(${study.accent})` } as CSSProperties;

  return (
    <main className={styles.page} style={accent}>
      <PageHeader activeLabel="Work" />

      <CaseStudyIntro
        title={study.title}
        image={study.heroImage}
      />
      <CaseStudyStatement intro={study.intro} details={study.details} />
      <CaseStudyBento
        title={study.title}
        video={study.video}
        images={study.bentoImages}
      />
      <CaseStudyBackend title={study.title} backend={study.backend} />

      <hr className={styles.rule} />

      <FadeInView>
        <section className={styles.follow}>
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
                    backgroundColor: "transparent",
                    marginBottom: 16,
                    borderRadius: 10,
                  }}
                >
                  {other.heroImage ? (
                    <Image
                      src={other.heroImage}
                      alt={other.title}
                      fill
                      style={{ objectFit: "cover", objectPosition: "top" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
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
