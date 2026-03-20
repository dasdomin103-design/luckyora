import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Providers } from "./components/Providers";
import { LayoutWrapper } from "./components/LayoutWrapper";
import { SoundProvider } from "./context/SoundContext";
import { DemoModeBanner } from "./components/DemoModeBanner";
import { ChatWidget } from "./components/ChatWidget";

export const metadata: Metadata = {
  title: "Luckyora - Play & Win Real Rewards",
  description: "Real-money gaming platform with tournaments and rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-black`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <SoundProvider>
          <Providers>
            <DemoModeBanner />
            <LayoutWrapper>{children}</LayoutWrapper>
            <ChatWidget />
          </Providers>
        </SoundProvider>
      </body>
    </html>
  );
}
