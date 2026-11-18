import type { Metadata } from "next";
import { getGitHubActivity } from "../../lib/github";
import ContactView from "../ContactView";

export const metadata: Metadata = {
  title: "Site Feedback | Brandon Nance",
  description: "A quick survey about alexandernance.com and my additional projects.",
  alternates: { canonical: "/contact/suggest" },
};

export default async function SuggestPage() {
  const github = await getGitHubActivity();
  return <ContactView initialTab="suggest" github={github} />;
}
