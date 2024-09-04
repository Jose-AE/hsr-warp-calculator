import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Links from "@/components/Links";
import { Analytics } from "@vercel/analytics/react";

const font = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warp Calculator",
  description: "",
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
        <Navbar>{children}</Navbar>
        <Links />
      </body>
    </html>
  );
}
