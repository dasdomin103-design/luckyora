import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const isPreview = process.env.VERCEL_ENV !== "production";
const baseUrl = "https://www.luckyora.live";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "Luckyora - Play Skill Games & Win Real Rewards",
    template: "%s | Luckyora",
  },

  description:
    "Play skill-based games like Ludo & Carrom on Luckyora. Join tournaments, compete with real players, and win real rewards.",

  keywords: [
    "skill based games",
    "real money games India",
    "play and win",
    "ludo online",
    "carrom online",
    "gaming tournaments India",
  ],

  alternates: {
    canonical: baseUrl,
  },

  openGraph: {
    title: "Luckyora - Play & Win Real Rewards",
    description:
      "Join Luckyora and compete in skill-based tournaments to win real rewards.",
    url: baseUrl,
    siteName: "Luckyora",
    images: [
      {
        url: `${baseUrl}/og-image.png`, // add this image in /public
        width: 1200,
        height: 630,
        alt: "Luckyora Gaming Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Luckyora - Play & Win",
    description:
      "Skill-based gaming platform with real rewards and tournaments.",
    images: [`${baseUrl}/og-image.png`],
  },

  robots: isPreview
    ? {
        index: false,
        follow: false,
        nocache: true,
      }
    : {
        index: true,
        follow: true,
      },
};