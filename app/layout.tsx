import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import PreloaderWrapper from "./components/PreloaderWrapper";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alexandernance.com"),
  title: "Brandon Nance | Software Engineer",
  description:
    "Brandon Nance is a software engineer in Los Angeles specializing in TypeScript, React, and Next.js. Currently building live streaming technology at Paramount and teaching Lagree fitness in DTLA.",
  keywords: [
    "Brandon Nance",
    "Software Engineer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Los Angeles",
    "Lagree",
    "Lagree Instructor",
    "Paramount",
  ],
  authors: [{ name: "Brandon Nance" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Brandon Nance | Software Engineer",
    description:
      "Software engineer in Los Angeles specializing in TypeScript, React, and Next.js. Building live streaming technology at Paramount and teaching Lagree fitness.",
    url: "https://alexandernance.com",
    siteName: "Brandon Nance",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brandon Nance | Software Engineer",
    description:
      "Software engineer in Los Angeles specializing in TypeScript, React, and Next.js.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "Brandon Nance",
                  url: "https://alexandernance.com",
                  description:
                    "Portfolio of Brandon Nance, a software engineer in Los Angeles.",
                },
                {
                  "@type": "Person",
                  name: "Brandon Nance",
                  url: "https://alexandernance.com",
                  jobTitle: "Software Engineer",
                  worksFor: {
                    "@type": "Organization",
                    name: "Paramount",
                  },
                  knowsAbout: [
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Software Engineering",
                    "Lagree Fitness",
                  ],
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "Towson University",
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Los Angeles",
                    addressRegion: "CA",
                    addressCountry: "US",
                  },
                  sameAs: [
                    "https://www.linkedin.com/in/bnance1/",
                    "https://github.com/Al3xand3r11",
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <PreloaderWrapper />
        <Header />
        {children}
      </body>
    </html>
  );
}
