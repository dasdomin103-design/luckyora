'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // ✅ NEW: Checkbox states
  const [isOver18, setIsOver18] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // ✅ Validate checkboxes
    if (!isOver18) {
      setMessage({
        type: 'error',
        text: 'You must be 18 years or older to use this platform',
      })
      return
    }

    if (!acceptedTerms) {
      setMessage({
        type: 'error',
        text: 'You must accept the Terms & Conditions and Privacy Policy',
      })
      return
    }

    if (!email.trim()) return

    setLoading(true)
    setMessage(null)

    try {
      const redirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/callback`
          : 'http://localhost:3000/auth/callback'

      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: redirectTo,
        },
      })

      if (error) throw error

      setMessage({
        type: 'success',
        text: 'Check your email for the login link!',
      })

      setEmail('')
      onSuccess?.()
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-yellow-400">Login</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl leading-none transition"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Info */}
        <p className="text-gray-400 text-sm mb-6">
          Enter your email to receive a magic link. No password needed.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 transition"
            />
          </div>

          {/* ✅ Age Verification Checkbox */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="age-check"
              checked={isOver18}
              onChange={(e) => setIsOver18(e.target.checked)}
              disabled={loading}
              className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-800 text-yellow-500 focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 cursor-pointer"
            />
            <label htmlFor="age-check" className="ml-2 text-sm text-gray-300 cursor-pointer">
              I confirm that I am <strong className="text-white">18 years or older</strong>
            </label>
          </div>

          {/* ✅ Terms & Conditions Checkbox */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms-check"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              disabled={loading}
              className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-800 text-yellow-500 focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 cursor-pointer"
            />
            <label htmlFor="terms-check" className="ml-2 text-sm text-gray-300">
              I agree to the{' '}
              <Link 
                href="/terms" 
                target="_blank"
                className="text-yellow-400 hover:text-yellow-300 underline"
                onClick={(e) => e.stopPropagation()}
              >
                Terms & Conditions
              </Link>
              ,{' '}
              <Link 
                href="/privacy" 
                target="_blank"
                className="text-yellow-400 hover:text-yellow-300 underline"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </Link>
              , and{' '}
              <Link 
                href="/disclaimer" 
                target="_blank"
                className="text-yellow-400 hover:text-yellow-300 underline"
                onClick={(e) => e.stopPropagation()}
              >
                Disclaimer
              </Link>
            </label>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.type === 'success' 
                  ? 'bg-green-900/50 text-green-300 border border-green-700' 
                  : 'bg-red-900/50 text-red-300 border border-red-700'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !isOver18 || !acceptedTerms}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-xs text-gray-400">
          <p>
            By signing up, you confirm you're 18+ and agree to our{' '}
            <Link href="/refund" target="_blank" className="text-yellow-400 hover:underline">
              Refund Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}