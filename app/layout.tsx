import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Luckyora - Play Free Games',
  description: 'Play 100+ free games instantly. No download, no signup.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
