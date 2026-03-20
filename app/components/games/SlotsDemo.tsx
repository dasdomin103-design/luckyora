'use client'

import { useState } from 'react'
import { useStore } from '@/app/store/useStore'
import { useSound } from '@/app/context/SoundContext'
import { GameLayout } from './GameLayout'
import { slotSpin, slotMultiplier } from '@/app/lib/gameLogic'
import toast from 'react-hot-toast'

export function SlotsDemo() {
  const { balance, deductBalance, addBalance, recordBet } = useStore()
  const { play } = useSound()
  const [betAmount, setBetAmount] = useState(10)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<{ won: boolean; message: string; payout?: number }>()
  const [reels, setReels] = useState<string[]>([])

  const playGame = () => {
    if (balance < betAmount) {
      toast.error('Insufficient balance')
      return
    }
    setPlaying(true)
    setResult(undefined)
    setReels(['?', '?', '?'])
    play('click')

    setTimeout(() => {
      const final = slotSpin()
      setReels(final)
      const mult = slotMultiplier(final)
      const won = mult > 0

      deductBalance(betAmount)
      const payout = Math.floor(betAmount * mult)
      if (won) addBalance(payout)

      recordBet(betAmount, won)
      setResult({
        won,
        message: won ? `${mult}x Multiplier!` : 'No match',
        payout: won ? payout : undefined,
      })

      play(won ? 'coin' : 'lose')
      setPlaying(false)
    }, 1200)
  }

  return (
    <GameLayout
      title="Slots"
      icon="🎰"
      balance={balance}
      betAmount={betAmount}
      onBetChange={setBetAmount}
      onPlay={playGame}
      playing={playing}
      result={result}
    >
      <div className="flex justify-center gap-4 py-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-20 h-24 bg-gray-800 rounded-xl flex items-center justify-center text-4xl border-2 border-yellow-500/50"
          >
            {reels[i] || '?'}
          </div>
        ))}
      </div>
    </GameLayout>
  )
}
