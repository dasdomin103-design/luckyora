'use client'

import { useStore } from '@/app/store/useStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const { adminStats, resetAdminStats } = useStore()
  const router = useRouter()

  const winRate =
    adminStats.gamesPlayed > 0
      ? ((adminStats.totalWins / adminStats.gamesPlayed) * 100).toFixed(1)
      : '0'

  const handleReset = () => {
    resetAdminStats()
    toast.success('All data reset!')
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-yellow-400">
            🔧 Pre-Launch Testing Dashboard
          </h1>
          <Link
            href="/"
            className="text-gray-400 hover:text-white"
          >
            ← Home
          </Link>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-400 mb-4">Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-bold text-yellow-400">
                  {adminStats.gamesPlayed}
                </p>
                <p className="text-sm text-gray-500">Games Played</p>
              </div>
              <div>
                <p className="text-3xl font-bold">₹{adminStats.totalBets}</p>
                <p className="text-sm text-gray-500">Total Bets</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-400">
                  {adminStats.totalWins}
                </p>
                <p className="text-sm text-gray-500">Wins</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-400">
                  {adminStats.totalLosses}
                </p>
                <p className="text-sm text-gray-500">Losses</p>
              </div>
            </div>
            <p className="mt-4 text-gray-400">
              Win/Loss Ratio: <span className="text-yellow-400">{winRate}%</span>
            </p>
          </div>

          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-red-400 mb-2">
              Danger Zone
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Reset all demo data including balance, stats, and tournaments.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-semibold"
            >
              Reset All Data
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
