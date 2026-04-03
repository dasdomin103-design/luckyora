'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Game {
  id: number
  name: string
}

export function GamesList() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGames = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch('/api/games', {
          headers: { Authorization: `Bearer ${session.access_token}` },
        })
        if (!res.ok) throw new Error('Failed to fetch games')
        const data = await res.json()
        setGames(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load games')
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  // Re-fetch when auth state changes (e.g., after login)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setLoading(true)
          try {
            const res = await fetch('/api/games', {
              headers: { Authorization: `Bearer ${session.access_token}` },
            })
            if (res.ok) {
              const data = await res.json()
              setGames(data)
            }
          } finally {
            setLoading(false)
          }
        } else if (event === 'SIGNED_OUT') {
          setGames([])
        }
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="text-gray-400 py-4">Loading games...</div>
  if (error) return <div className="text-red-400 py-4">{error}</div>

  // Default games when not logged in (placeholder)
  const displayGames =
    games.length > 0
      ? games
      : [
          { id: 1, name: 'Teen Patti' },
          { id: 2, name: 'Puzzle' },
          { id: 3, name: 'Arcade' },
          { id: 4, name: 'Card Game' },
        ]

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {displayGames.map((game) => (
        <div
          key={game.id}
          className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer"
        >
          {game.name}
        </div>
      ))}
    </div>
  )
}
