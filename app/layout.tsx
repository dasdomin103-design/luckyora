import "./globals.css";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { ReactNode } from "react";

export const metadata = {
  title: "Luckyora - Free Online Games",
  description: "Play 100+ free games online instantly",
  metadataBase: new URL("https://luckyora.live"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-D8DCSL5DPE" />
        <AnalyticsTracker />
      </body>
    </html>
  );
}