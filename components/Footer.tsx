import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white p-6 text-center">
      <p>© 2026 Luckyora.live</p>

      <div className="flex justify-center gap-4 mt-2">
        <Link href="/privacy-policy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>Email: luckyoralive@gmail.com</p>
        <p>Phone: +91 8369372112</p>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        All games are free to play. No real money or gambling involved.
      </p>
    </footer>
  );
}
