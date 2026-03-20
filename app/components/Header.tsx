'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import { LoginModal } from './LoginModal'
import { SoundToggle } from './SoundToggle'
import { DemoModeToggle } from './DemoModeToggle'
import { useStore } from '@/app/store/useStore'

export function Header() {
  const { user, setUser } = useStore()
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    )

    return () => subscription.unsubscribe()
  }, [setUser])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-400">Luckyora</h1>
        <div className="flex items-center gap-2">
          <DemoModeToggle />
          <SoundToggle />
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 truncate max-w-[120px]">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-lg"
          >
            Login
          </button>
        )}
        </div>
      </div>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={() => setShowLogin(false)}
      />
    </>
  )
}
