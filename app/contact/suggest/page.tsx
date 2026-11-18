import type { Metadata } from "next";
import ContactView from "../ContactView";

export const metadata: Metadata = {
  title: "Site Feedback | Brandon Nance",
  description: "A quick survey about alexandernance.com and my additional projects.",
  alternates: { canonical: "/contact/suggest" },
};

export default function SuggestPage() {
  return <ContactView initialTab="suggest" />;
}
