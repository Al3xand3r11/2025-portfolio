import { CASE_STUDIES, CASE_STUDY_SLUGS } from "../caseStudies";

export type Target = {
  slug: string;
  title: string;
  url: string;
};

/** The sites in the work section. There is no second list of URLs. */
export const HEALTH_TARGETS: Target[] = CASE_STUDY_SLUGS.map((slug) => ({
  slug,
  title: CASE_STUDIES[slug].title,
  url: CASE_STUDIES[slug].url,
}));
