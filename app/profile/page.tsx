'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Header } from '../components/Header'
import { useStore } from '../store/useStore'
import { supabase } from '../lib/supabase'

export default function ProfilePage() {
  const { user, setUser, userStats, setUserStats } = useStore()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }
    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_e, session) => setUser(session?.user ?? null)
    )
    return () => subscription.unsubscribe()
  }, [setUser])

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <Header />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-yellow-400">👤 Profile</h1>
        <p className="text-gray-400 text-sm">Your gaming stats</p>
      </div>

      {user ? (
        <>
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center text-2xl">
                {user.email?.[0]?.toUpperCase() || '?'}
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {user.user_metadata?.full_name || 'Player'}
                </h2>
                <p className="text-gray-400 text-sm truncate max-w-[200px]">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Total Winnings</p>
                <p className="text-2xl font-bold text-green-400">
                  ₹{userStats.totalWinnings}
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Games Played</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {userStats.gamesPlayed}
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/wallet"
            className="block bg-gradient-to-r from-yellow-600/20 to-purple-600/20 border border-yellow-500/30 rounded-xl p-4 mb-4 hover:border-yellow-500/50 transition-colors"
          >
            <span className="text-yellow-400">💰</span> View Wallet
          </Link>

          <button
            onClick={async () => {
              await supabase.auth.signOut()
              setUser(null)
            }}
            className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 py-3 rounded-xl font-semibold text-red-400"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8 text-center">
          <p className="text-gray-400 mb-4">Please log in to view your profile</p>
          <p className="text-sm text-gray-500">Use the Login button in the header</p>
        </div>
      )}
    </main>
  )
}
