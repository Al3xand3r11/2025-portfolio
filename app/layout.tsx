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
  title: "Brandon Nance | Software Engineer",
  description: "Software Engineer based in Los Angeles. Building community through technology.",
  keywords: ["Software Engineer", "Web Developer", "React", "Next.js", "Los Angeles"],
  authors: [{ name: "Brandon Nance" }],
  openGraph: {
    title: "Brandon Nance | Software Engineer",
    description: "Software Engineer based in Los Angeles. Building community through technology.",
    type: "website",
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
        {/* Fonts are self-hosted via @font-face in globals.css */}
      </head>
      <body>
        <PreloaderWrapper />
        <Header />
        {children}
      </body>
    </html>
  );
}
