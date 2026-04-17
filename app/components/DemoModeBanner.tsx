'use client'

import { useStore } from '@/app/store/useStore'

export function DemoModeBanner() {
  const { demoMode } = useStore()
  const isStaging = process.env.NEXT_PUBLIC_STAGING === 'true'

  if (!demoMode && !isStaging) return null

  return (
    <div className="bg-yellow-500/20 border-b border-yellow-500/50 py-2 px-4 text-center">
      <span className="text-yellow-400 font-semibold text-sm">
        {demoMode ? '🎮 You are in Demo Mode - No real money' : ''}
        {demoMode && isStaging ? ' | ' : ''}
        {isStaging ? '🔧 STAGING MODE' : ''}
      </span>
    </div>
  )
}
