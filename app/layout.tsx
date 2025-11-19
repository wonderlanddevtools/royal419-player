import type { Metadata } from "next";
import { Inter, Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ['400', '500', '600'],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ['600', '700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ['500', '600', '700'],
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
        className={`${inter.variable} ${syne.variable} ${spaceGrotesk.variable} antialiased font-inter`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
