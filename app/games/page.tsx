'use client'

import { Header } from '../components/Header'
import { GameCard } from '../components/GameCard'
import {
  GAMES,
  CATEGORY_LABELS,
  getGamesByCategory,
  type Game,
} from '../lib/games-data'

const CATEGORIES: Game['category'][] = ['card', 'casino', 'slots', 'arcade', 'live']

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-black text-white p-4">
      <Header />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-yellow-400 mb-1">🎮 All Games</h1>
        <p className="text-gray-400 text-sm">Choose from 20+ exciting games</p>
      </div>

      {CATEGORIES.map((category) => {
        const games = getGamesByCategory(category)
        if (games.length === 0) return null

        return (
          <section key={category} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-300 mb-3">
              {CATEGORY_LABELS[category]}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )
      })}
    </main>
  )
}
