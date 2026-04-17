'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useStore } from '@/app/store/useStore'
import { getGameBySlug } from '@/app/lib/games-data'
import { GameDemo } from '@/app/components/games'

export default function GamePlayPage() {
  const params = useParams()
  const slug = params.slug as string
  const game = getGameBySlug(slug)

  const { balance } = useStore()

  if (!game) {
    return (
      <main className="min-h-screen bg-black text-white p-4 flex flex-col items-center justify-center">
        <h1 className="text-xl text-red-400">Game not found</h1>
        <Link href="/games" className="text-yellow-400 mt-4 hover:underline">
          Back to Games
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/games"
          className="text-gray-400 hover:text-white flex items-center gap-2"
        >
          ← Back to Games
        </Link>
        <span className="text-yellow-400 font-semibold text-lg">₹{balance}</span>
      </div>

      <div className="max-w-lg mx-auto">
        <GameDemo slug={game.slug} title={game.name} icon={game.icon} />
      </div>

      <Link
        href="/games"
        className="block text-center text-gray-400 hover:text-yellow-400 py-6"
      >
        ← Back to Games
      </Link>
    </main>
  )
}
