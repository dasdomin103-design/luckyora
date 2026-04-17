'use client'

import { Header } from '../components/Header'
import { TOURNAMENTS } from '../lib/tournaments-data'
import { useStore } from '../store/useStore'
import { useState } from 'react'
import { TournamentJoinModal } from '../components/TournamentJoinModal'
import type { Tournament } from '../lib/tournaments-data'

export default function TournamentPage() {
  const { balance, joinedTournaments } = useStore()
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <Header />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-yellow-400">🏆 Tournaments</h1>
        <p className="text-gray-400 text-sm">Compete and win big</p>
      </div>

      <div className="space-y-4">
        {TOURNAMENTS.map((t) => (
          <div
            key={t.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-5 hover:border-yellow-500/30 transition-colors"
          >
            <h3 className="font-semibold text-lg mb-2">{t.name}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-4">
              <p>Entry: ₹{t.entryFee}</p>
              <p>Prize: ₹{t.prizePool}</p>
              <p>Players: {t.playersJoined}/{t.maxPlayers}</p>
              <p>Starts in: {t.startsIn}</p>
            </div>
            <div className="mb-4 p-2 bg-gray-800/50 rounded text-xs">
              <p className="text-gray-500 mb-1">Leaderboard</p>
              <ol className="space-y-0.5">
                <li>1. Player_1 - 1250 pts</li>
                <li>2. Player_2 - 980 pts</li>
                <li>3. You - 0 pts</li>
              </ol>
            </div>
            <button
              onClick={() => setSelectedTournament(t)}
              disabled={joinedTournaments.includes(t.id)}
              className={`w-full py-2 rounded-lg font-semibold ${
                joinedTournaments.includes(t.id)
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-black'
              }`}
            >
              {joinedTournaments.includes(t.id) ? 'Joined' : 'Join Now'}
            </button>
          </div>
        ))}
      </div>

      {selectedTournament && (
        <TournamentJoinModal
          tournament={selectedTournament}
          isOpen={!!selectedTournament}
          onClose={() => setSelectedTournament(null)}
        />
      )}
    </main>
  )
}
