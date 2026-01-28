import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import PreloaderWrapper from "./components/PreloaderWrapper";

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
    <html lang="en">
      <head>
        {/* Preconnect to font services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        
        {/* Google Fonts - Instrument Serif & JetBrains Mono */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        
        {/* Fontshare - Satoshi */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
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
