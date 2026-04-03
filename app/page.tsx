'use client'

import Link from 'next/link'
import { Header } from './components/Header'
import { GameCard } from './components/GameCard'
import {
  getFeaturedGames,
  getTrendingGames,
} from './lib/games-data'
import { TOURNAMENTS as TOURNAMENT_DATA } from './lib/tournaments-data'
import { useStore } from './store/useStore'
import { useState } from 'react'
import { TournamentJoinModal } from './components/TournamentJoinModal'
import type { Tournament } from './lib/tournaments-data'
export default function Home() {
  const { balance, joinTournament, joinedTournaments } = useStore()
  const featured = getFeaturedGames()
  const trending = getTrendingGames()
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  return (
    <main className="min-h-screen bg-black text-white p-4">
      <Header />
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-5 rounded-xl mb-6">
        <h2 className="text-xl font-bold">🔥 Play & Win Real Rewards</h2>
        <p className="text-gray-200/90 mb-4">Join tournaments and earn coins</p>
        <div className="flex gap-3">
          <Link
            href="/games"
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Play Now
          </Link>
          <Link
            href="/tournament"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Join Tournament
          </Link>
        </div>
      </div>

      {/* Featured Games */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-yellow-400 mb-3">
          ⭐ Featured Games
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {featured.map((game) => (
            <GameCard key={game.id} game={game} size="lg" />
          ))}
        </div>
      </section>

      {/* Trending Games */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-yellow-400 mb-3">
          📈 Trending Games
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1">
          {trending.map((game) => (
            <div key={game.id} className="flex-shrink-0 w-[140px]">
              <GameCard game={game} size="sm" />
            </div>
          ))}
        </div>
      </section>

      {/* Tournaments */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-yellow-400 mb-3">
          🏆 Active Tournaments
        </h2>
        <div className="space-y-4">
          {TOURNAMENT_DATA.slice(0, 2).map((t) => (
            <div
              key={t.id}
              className="bg-gray-900 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-400">
                    Entry: ₹{t.entryFee} • Prize: ₹{t.prizePool}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t.playersJoined}/{t.maxPlayers} players • Starts in {t.startsIn}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedTournament(t)}
                  disabled={joinedTournaments.includes(t.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                    joinedTournaments.includes(t.id)
                      ? 'bg-gray-700 text-gray-500'
                      : 'bg-green-500 hover:bg-green-400 text-black'
                  }`}
                >
                  {joinedTournaments.includes(t.id) ? 'Joined' : 'Join Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/tournament"
          className="block text-center text-yellow-400 hover:underline mt-2"
        >
          View all tournaments →
        </Link>
        </section>
{/* Modal */}
{selectedTournament && (
  <TournamentJoinModal
    tournament={selectedTournament}
    isOpen={true}
    onClose={() => setSelectedTournament(null)}
  />
)}

</main>
)
}