import type { Metadata } from "next";
import { Eczar} from "next/font/google";
import "./globals.css";
import NavBar from "./nav/navbar";


const eczar = Eczar({
  weight: 'variable',
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Brandon's Portfolio",
  description: "Creates in ts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${eczar}`}>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
