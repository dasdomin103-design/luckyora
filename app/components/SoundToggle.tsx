'use client'

import { useSound } from '@/app/context/SoundContext'

export function SoundToggle() {
  const { enabled, setEnabled, play, initOnInteraction } = useSound()

  const handleClick = () => {
    initOnInteraction()
    play('click')
    setEnabled(!enabled)
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
      aria-label={enabled ? 'Mute sound' : 'Unmute sound'}
      title={enabled ? 'Sound ON' : 'Sound OFF'}
    >
      {enabled ? (
        <span className="text-lg">🔊</span>
      ) : (
        <span className="text-lg opacity-60">🔇</span>
      )}
    </button>
  )
}
