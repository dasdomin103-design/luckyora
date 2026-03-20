'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      const hashParams = new URLSearchParams(
        window.location.hash.substring(1)
      )
      const queryParams = new URLSearchParams(
        window.location.search.substring(1)
      )

      // Handle code from PKCE flow (query params)
      const code = queryParams.get('code')
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        if (exchangeError) {
          setError(exchangeError.message)
          return
        }
      } else {
      // Handle token_hash from magic link (query params)
      const tokenHash = queryParams.get('token_hash')
      const type = queryParams.get('type')

      if (tokenHash && type) {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type as 'email' | 'magiclink',
        })
        if (verifyError) {
          setError(verifyError.message)
          return
        }
      } else if (hashParams.get('access_token') && hashParams.get('refresh_token')) {
        // Handle implicit flow (hash fragment)
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: hashParams.get('access_token')!,
          refresh_token: hashParams.get('refresh_token')!,
        })
        if (sessionError) {
          setError(sessionError.message)
          return
        }
      } else {
        // No auth params - maybe already logged in, redirect home
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          setError('Invalid or expired link. Please try logging in again.')
          return
        }
      }
      }

      // Brief delay so session is persisted before redirect
      await new Promise((r) => setTimeout(r, 100))

      // Clear URL and redirect
      window.history.replaceState({}, '', '/')
      router.replace('/')
      router.refresh()
    }

    handleCallback()
  }, [router])

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-red-400 mb-4">{error}</p>
          <a
            href="/"
            className="text-yellow-400 hover:underline"
          >
            Return to home
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-gray-400">Completing login...</p>
    </main>
  )
}
