'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const SESSION_KEY = 'luckyora_session_id'

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lastTrackedPath = useRef<string>('')

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith('/admin')) {
      return
    }

    // Prevent duplicate tracking on same path
    if (lastTrackedPath.current === pathname) {
      return
    }

    const trackVisit = async () => {
      try {
        // Get existing session ID
        let sessionId = localStorage.getItem(SESSION_KEY)

        const response = await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            path: pathname,
            referrer: document.referrer || null
          }),
        })

        const data = await response.json()

        // Store new session ID if created
        if (data.sessionId && data.isNewSession) {
          localStorage.setItem(SESSION_KEY, data.sessionId)
        }

        lastTrackedPath.current = pathname

      } catch (error) {
        console.error('Tracking failed:', error)
      }
    }

    trackVisit()
  }, [pathname])

  return <>{children}</>
}