'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  getSoundPrefs,
  setSoundPrefs,
  playSound,
  playBgMusic,
  initBgMusic,
  type SoundPrefs,
} from '@/app/lib/soundManager'

type SoundContextType = {
  enabled: boolean
  setEnabled: (v: boolean) => void
  play: (name: 'click' | 'card' | 'win' | 'lose' | 'coin') => void
  initOnInteraction: () => void
}

const SoundContext = createContext<SoundContextType | null>(null)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = useState(true)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const prefs = getSoundPrefs()
    setEnabledState(prefs.enabled)
  }, [])

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v)
    setSoundPrefs({ enabled: v })
  }, [])

  const initOnInteraction = useCallback(() => {
    if (initialized) return
    setInitialized(true)
    initBgMusic()
    playBgMusic()
  }, [initialized])

  const play = useCallback(
    (name: 'click' | 'card' | 'win' | 'lose' | 'coin') => {
      if (enabled) playSound(name)
    },
    [enabled]
  )

  return (
    <SoundContext.Provider
      value={{ enabled, setEnabled, play, initOnInteraction }}
    >
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const ctx = useContext(SoundContext)
  return ctx || { enabled: true, setEnabled: () => {}, play: () => {}, initOnInteraction: () => {} }
}
