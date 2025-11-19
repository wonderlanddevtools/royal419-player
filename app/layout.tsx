import type { Metadata } from "next";
import { Inter, Permanent_Marker, Rock_Salt } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

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

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
  display: "swap",
});

const rockSalt = Rock_Salt({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rock-salt",
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
        className={`${inter.variable} ${geistMono.variable} ${permanentMarker.variable} ${rockSalt.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
