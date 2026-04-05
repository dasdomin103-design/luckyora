'use client'

import { useState } from 'react'
import Link from 'next/link'
import TournamentJoinModal from '@/components/TournamentJoinModal'

const TOURNAMENT_DATA = [
  {
    id: 1,
    name: 'Weekend Warrior',
    entryFee: 50,
    prizePool: 5000,
    maxPlayers: 100,
    playersJoined: 67,
    startsIn: '2h 15m'
  },
  {
    id: 2,
    name: 'Pro League Finals',
    entryFee: 200,
    prizePool: 50000,
    maxPlayers: 50,
    playersJoined: 43,
    startsIn: '5h 30m'
  }
]

export default function HomePage() {
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [joinedTournaments, setJoinedTournaments] = useState([])

  const buttonClass = (id) => {
    if (joinedTournaments.includes(id)) {
      return 'px-4 py-2 rounded-lg font-semibold text-sm bg-gray-700 text-gray-500'
    }
    return 'px-4 py-2 rounded-lg font-semibold text-sm bg-green-500 hover:bg-green-400 text-black'
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <section className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">
          Welcome to LuckyOra
        </h1>
        <p className="text-gray-400">
          Win real money playing skill-based games
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-yellow-400 mb-3">
          Active Tournaments
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
                    Entry: Rs.{t.entryFee} - Prize: Rs.{t.prizePool}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t.playersJoined}/{t.maxPlayers} players - Starts in {t.startsIn}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedTournament(t)}
                  disabled={joinedTournaments.includes(t.id)}
                  className={buttonClass(t.id)}
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
          View all tournaments
        </Link>
      </section>

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