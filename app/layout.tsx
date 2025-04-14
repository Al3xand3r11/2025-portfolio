import type { Metadata } from "next";
import { Darker_Grotesque} from "next/font/google";
import "./globals.css";
import NavBar from "./nav/navbar";


const grotesque = Darker_Grotesque({
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
      <body className={grotesque.className}>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
