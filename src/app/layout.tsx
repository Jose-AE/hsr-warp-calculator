import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Links from "@/components/Links";
import { Analytics } from "@vercel/analytics/react";

const font = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warp Calculator - Honkai: Star Rail, Genshin, ZZZ, and More",
  description:
    "A comprehensive Gacha pull Calculator for HoYoverse games. Simulate pulls/wishes/warps and calculate your odds of getting characters, weapons/light cones in Honkai: Star Rail, Genshin Impact, and Zenless Zone Zero. Features accurate pity system modeling, 50/50 mechanics, and detailed success rate analysis for optimal wishing strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2934132820353961"
          crossOrigin="anonymous"
        ></Script>
        <Analytics />
        {children}
        <Links />
      </body>
    </html>
  );
}
