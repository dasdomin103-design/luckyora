'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

const gameUrls: Record<string, { url: string; title: string }> = {
  "2048": {
    title: "2048",
    url: "https://play2048.co/"
  },
  "snake": {
    title: "Snake",
    url: "https://www.google.com/fbx?fbx=snake_arcade"
  },
  "tetris": {
    title: "Tetris",
    url: "https://tetris.com/play-tetris"
  },
  "pacman": {
    title: "Pac-Man",
    url: "https://freepacman.org/"
  },
  "chess": {
    title: "Chess",
    url: "https://www.chess.com/play/computer"
  },
}

export default function GamePage() {
  const params = useParams()
  const slug = params.slug as string
  const game = gameUrls[slug?.toLowerCase()]

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white gap-4">
        <p className="text-2xl font-bold">Game not found</p>
        <p className="text-gray-400">
          No game exists for: <span className="text-yellow-400">{slug}</span>
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">

      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-gray-400 hover:text-white transition">
          ← Back
        </Link>
      </div>

      {/* Game Title */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        {game.title}
      </h1>

      {/* Game Card */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl text-center max-w-md w-full">

        <p className="text-gray-300 mb-6">
          Click below to start playing instantly.
        </p>

        {/* Play Button */}
        <a
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition transform"
        >
          ▶ Play Now
        </a>

        {/* Note */}
        <p className="text-xs text-gray-500 mt-4">
          Opens in a new tab for best performance
        </p>
      </div>
    </div>
  )
}