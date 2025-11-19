import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Background } from "@/components/Background";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Background />
        {children}
      </body>
    </html>
  );
}
