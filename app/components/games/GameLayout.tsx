'use client'

import { useSound } from '@/app/context/SoundContext'

const BET_AMOUNTS = [10, 50, 100, 500]

interface GameLayoutProps {
  children: React.ReactNode
  title: string
  icon: string
  balance: number
  betAmount: number
  onBetChange: (amount: number) => void
  onPlay: () => void
  playing: boolean
  result?: { won: boolean; message: string; payout?: number }
  hidePlayButton?: boolean
}

export function GameLayout({
  children,
  title,
  icon,
  balance,
  betAmount,
  onBetChange,
  onPlay,
  playing,
  result,
  hidePlayButton,
}: GameLayoutProps) {
  const { play, initOnInteraction } = useSound()

  const handleBetClick = (amount: number) => {
    play('click')
    onBetChange(amount)
  }

  const handlePlay = () => {
    initOnInteraction()
    play('click')
    onPlay()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{icon}</span>
        <h2 className="text-xl font-bold text-yellow-400">{title}</h2>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-4 min-h-[200px] border border-gray-700">
        {children}
      </div>

      {result && (
        <div
          className={`p-4 rounded-xl font-semibold text-center animate-pulse ${
            result.won
              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
              : 'bg-red-500/20 text-red-400 border border-red-500/50'
          }`}
        >
          {result.message}
          {result.payout != null && result.won && (
            <span className="block text-2xl mt-1">+₹{result.payout}</span>
          )}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {BET_AMOUNTS.map((amt) => (
          <button
            key={amt}
            onClick={() => handleBetClick(amt)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              betAmount === amt
                ? 'bg-yellow-500 text-black ring-2 ring-yellow-400'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            ₹{amt}
          </button>
        ))}
      </div>

      {!hidePlayButton && (
        <button
          onClick={handlePlay}
          disabled={playing || balance < betAmount}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-black text-lg btn-neon transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {playing ? 'Playing...' : `Play ₹${betAmount}`}
        </button>
      )}
    </div>
  )
}
