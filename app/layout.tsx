import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}else if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.setAttribute("data-theme","dark");}else{document.documentElement.setAttribute("data-theme","light");}}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
