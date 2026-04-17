'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'
import Link from 'next/link'

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          setStatus('error')
          setMessage(error.message)
          return
        }

        if (session?.user) {
          // Create user_stats if not exists
          const { error: checkError } = await supabase
            .from('user_stats')
            .select('*')
            .eq('user_id', session.user.id)
            .single()

          if (checkError?.code === 'PGRST116') {
            await supabase.from('user_stats').insert([
              {
                user_id: session.user.id,
                games_played: 0,
                total_wins: 0,
              },
            ])
          }

          setStatus('success')
          setMessage('Login successful! Redirecting...')

          setTimeout(() => {
            router.push('/profile')
          }, 1500)
        } else {
          setStatus('error')
          setMessage('No session found. Please try again.')
        }
      } catch (err: any) {
        setStatus('error')
        setMessage(err.message || 'An unexpected error occurred')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/50 p-8 rounded-xl max-w-md w-full border border-purple-500/30 text-center">
        
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Authenticating...</h2>
            <p className="text-gray-400">Please wait</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-green-500 text-6xl mb-6">✓</div>
            <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
            <p className="text-gray-400">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-red-500 text-6xl mb-6">✕</div>
            <h2 className="text-2xl font-bold text-white mb-2">Failed</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <Link
              href="/auth"
              className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
            >
              Try Again
            </Link>
          </>
        )}

      </div>
    </div>
  )
}