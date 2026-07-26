import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { lagreeSchema } from "../lib/schema";
import { LAGREE_ORIGIN } from "../lib/sites";
import FitnessNav from "./FitnessNav";
import FitnessTransition from "./FitnessTransition";
import { MotionProvider } from "./Motion";
import styles from "./fitness.module.css";

const TITLE = "Brandon Nance | Lagree Instructor in Los Angeles";
const DESCRIPTION =
  "Lagree classes taught by Brandon Nance in downtown Los Angeles — Arts District and Historic Core. See the weekly schedule and book a class.";

/* This segment is served from its own subdomain, so it overrides everything the
   root layout sets for the portfolio: the base URL its links resolve against,
   the social card, and the keywords. */
export const metadata: Metadata = {
  metadataBase: new URL(LAGREE_ORIGIN),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Lagree",
    "Lagree Los Angeles",
    "Lagree DTLA",
    "Megaformer",
    "Brandon Nance",
    "Arts District",
    "Historic Core",
    "Pilates Los Angeles",
  ],
  authors: [{ name: "Brandon Nance" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: LAGREE_ORIGIN,
    siteName: "Brandon Nance | Lagree",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function FitnessLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-site="fitness" className={styles.site}>
      <JsonLd data={lagreeSchema} />

      <MotionProvider>
        <FitnessTransition />
        <FitnessNav />

        {children}
      </MotionProvider>
    </div>
  );
}
