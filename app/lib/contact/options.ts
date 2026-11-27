import { ADDITIONAL_PROJECTS } from "../additionalProjects";
import { CASE_STUDIES, CASE_STUDY_SLUGS } from "../caseStudies";

export const BUDGETS = ["Under $1k", "$1k – $3k", "$3k – $10k", "$10k+", "Not sure yet"] as const;
export const TIMELINES = ["ASAP", "1 – 3 months", "3 – 6 months", "Flexible"] as const;

/** Hosts of the live case studies, plus this site. Stored inquiry text is left as it was. */
export const INSPIRATIONS = [
  "alexandernance.com",
  ...CASE_STUDY_SLUGS.map((slug) => new URL(CASE_STUDIES[slug].url).hostname.replace(/^www\./, "")),
  "N/A",
] as const;

/* `name` is both the form field name and the column the answer lands in. */
export const RATING_QUESTIONS = [
  { name: "responsiveness", question: "How responsive is the website?" },
  { name: "timeSpent", question: "How much time did you spend on this website?" },
  { name: "wouldRecommend", question: "Would you recommend this website?" },
] as const;

export const SUGGEST_PROJECTS: string[] = [
  "alexandernance.com",
  ...ADDITIONAL_PROJECTS.map((p) => p.title),
];

export const MESSAGE_LIMIT = 500;
