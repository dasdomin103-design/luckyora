'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'
import Link from 'next/link'

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setMessage(null)
    setIsError(false)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setIsError(true)
      setMessage(error.message)
    } else {
      setIsError(false)
      setMessage('Login successful!')
      router.push('/profile')
    }

    setLoading(false)
  }

  const handleSignup = async () => {
    setLoading(true)
    setMessage(null)
    setIsError(false)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setIsError(true)
      setMessage(error.message)
    } else {
      setIsError(false)
      setMessage('Check your email for confirmation link!')
    }

    setLoading(false)
  }

  const handleMagicLink = async () => {
    setLoading(true)
    setMessage(null)
    setIsError(false)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setIsError(true)
      setMessage(error.message)
    } else {
      setIsError(false)
      setMessage('Magic link sent! Check your email.')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl w-full max-w-md border border-purple-500/30 shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          🎮 Lucky Ora
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all disabled:opacity-50"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleLogin}
              disabled={loading || !email || !password}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all disabled:cursor-not-allowed"
            >
              Login
            </button>

            <button
              onClick={handleSignup}
              disabled={loading || !email || !password}
              className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all disabled:cursor-not-allowed"
            >
              Sign Up
            </button>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">or</span>
            </div>
          </div>

          <button
            onClick={handleMagicLink}
            disabled={loading || !email}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg font-semibold transition-all disabled:cursor-not-allowed"
          >
            ✨ Send Magic Link
          </button>
        </div>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm text-center ${
              isError
                ? 'bg-red-500/20 border border-red-500 text-red-400'
                : 'bg-green-500/20 border border-green-500 text-green-400'
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-purple-400 hover:text-purple-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}