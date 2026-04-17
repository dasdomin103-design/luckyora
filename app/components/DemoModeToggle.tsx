'use client'

import { useStore } from '@/app/store/useStore'

export function DemoModeToggle() {
  const { demoMode, setDemoMode } = useStore()

  return (
    <button
      onClick={() => setDemoMode(!demoMode)}
      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
        demoMode
          ? 'bg-yellow-500/30 text-yellow-400 border border-yellow-500/50'
          : 'bg-gray-700 text-gray-400'
      }`}
      title={demoMode ? 'Demo Mode ON' : 'Demo Mode OFF'}
    >
      Demo {demoMode ? 'ON' : 'OFF'}
    </button>
  )
}
