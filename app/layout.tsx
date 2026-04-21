import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Luckyora - Free Online Games",
  description: "Play 100+ free games online instantly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        <Footer />
      </body>
    </html>
  );
}
