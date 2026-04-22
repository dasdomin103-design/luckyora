import "./globals.css";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "Luckyora - Free Online Games",
  description: "Play 100+ free games online instantly",
  keywords: "free online games, play games, browser games, luckyora",
  authors: [{ name: "Luckyora" }],
  metadataBase: new URL("https://luckyora.com"),
  openGraph: {
    title: "Luckyora - Free Online Games",
    description: "Play 100+ free games online instantly",
    url: "https://luckyora.com",
    siteName: "Luckyora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luckyora - Free Online Games",
    description: "Play 100+ free games online instantly",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        <Footer />

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-D8DCSL5DPE" />

        <AnalyticsTracker />

        <AnalyticsTracker />
      </body>
    </html>
  );
}
