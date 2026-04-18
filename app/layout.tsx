import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luckyora - Play 100+ Free Games Instantly",
  description: "Play 100+ free games instantly. No downloads, no signup required. Arcade, Puzzle, Strategy, Action and Multiplayer games.",
  keywords: ["free games", "online games", "arcade games", "puzzle games", "strategy games", "browser games"],
  authors: [{ name: "Luckyora" }],
  openGraph: {
    title: "Luckyora - Play 100+ Free Games Instantly",
    description: "Play 100+ free games instantly. No downloads, no signup required.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luckyora - Play 100+ Free Games Instantly",
    description: "Play 100+ free games instantly. No downloads, no signup required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-slate-950 text-white`}>
        {children}
      </body>
    </html>
  );
}
