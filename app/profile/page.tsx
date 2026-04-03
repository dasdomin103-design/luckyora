'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useStore } from '../store/useStore'
import { supabase } from '../lib/supabase'

interface ProfileStats {
  gamesPlayed: number
  totalWins: number
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, setUser } = useStore()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<ProfileStats>({ gamesPlayed: 0, totalWins: 0 })

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        
        if (session?.user) {
          // Try to get existing stats
          const { data, error } = await supabase
            .from('user_stats')
            .select('*')
            .eq('user_id', session.user.id)
            .single()
          
          if (error) {
            // If no stats found, create them
            if (error.code === 'PGRST116') {
              const { data: newStats, error: insertError } = await supabase
                .from('user_stats')
                .insert([
                  {
                    user_id: session.user.id,
                    games_played: 0,
                    total_wins: 0,
                  }
                ])
                .select()
                .single()

              if (insertError) {
                console.error('Error creating stats:', insertError)
              } else if (newStats) {
                setStats({
                  gamesPlayed: newStats.games_played ?? 0,
                  totalWins: newStats.total_wins ?? 0
                })
              }
            } else {
              console.error('Stats error:', error.message)
            }
          } else if (data) {
            setStats({
              gamesPlayed: data.games_played ?? 0,
              totalWins: data.total_wins ?? 0
            })
          }
        }
      } catch (error) {
        console.error('Error fetching session:', error)
      } finally {
        setLoading(false)
      }
    }
    getSession()
  }, [setUser])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.totalWins / stats.gamesPlayed) * 100) 
    : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
        
        {user ? (
          <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl text-white font-bold">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-white text-xl font-semibold break-all">
                    {user.email || 'No email'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Member since {user.created_at 
                      ? new Date(user.created_at).toLocaleDateString() 
                      : 'Unknown'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm">Games Played</p>
                <p className="text-white text-2xl font-bold">{stats.gamesPlayed}</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm">Total Wins</p>
                <p className="text-white text-2xl font-bold">{stats.totalWins}</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm">Win Rate</p>
                <p className="text-white text-2xl font-bold">{winRate}%</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30 text-center">
            <p className="text-gray-400 mb-4">Please sign in to view your profile</p>
            <Link href="/auth" className="text-purple-400 hover:text-purple-300 underline">
              Go to Login
            </Link>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/" className="text-purple-400 hover:text-purple-300">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}