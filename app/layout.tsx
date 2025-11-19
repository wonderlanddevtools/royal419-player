import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/Background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Inter({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Royal 419 - The Prince of Nigeria",
  description: "Six tracks of untouchable romance, wire-transfer ballads, and routing number funk. Music & Lyrics By The Prince of Nigeria.",
  keywords: ["Royal 419", "Prince of Nigeria", "music player", "album", "interactive"],
  authors: [{ name: "Superbloom House" }],
  openGraph: {
    title: "Royal 419 - The Prince of Nigeria",
    description: "Six tracks of untouchable romance, wire-transfer ballads, and routing number funk.",
    type: "music.album",
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
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <Background />
        {children}
      </body>
    </html>
  );
}
