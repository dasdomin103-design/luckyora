'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase'

export function Header() {
  const [user, setUser] = useState<any>(null)

  // ✅ Get current session
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
    }

    getUser()

    // ✅ Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // 🚪 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="flex justify-between items-center mb-6">
      <Link href="/" className="text-xl font-bold text-yellow-400">
        🎮 LuckyOra
      </Link>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm text-gray-300">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/auth"
            className="bg-green-500 px-3 py-1 rounded text-sm text-black"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  )
}