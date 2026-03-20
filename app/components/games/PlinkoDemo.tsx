'use client'

import { useState } from 'react'
import { useStore } from '@/app/store/useStore'
import { useSound } from '@/app/context/SoundContext'
import { GameLayout } from './GameLayout'
import { plinkoResult } from '@/app/lib/gameLogic'
import toast from 'react-hot-toast'

export function PlinkoDemo() {
  const { balance, deductBalance, addBalance, recordBet } = useStore()
  const { play } = useSound()
  const [betAmount, setBetAmount] = useState(10)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<{ won: boolean; message: string; payout?: number }>()
  const [multiplier, setMultiplier] = useState<number | null>(null)

  const playGame = () => {
    if (balance < betAmount) {
      toast.error('Insufficient balance')
      return
    }
    setPlaying(true)
    setResult(undefined)
    setMultiplier(null)
    play('click')

    setTimeout(() => {
      const mult = plinkoResult()
      setMultiplier(mult)
      const payout = Math.floor(betAmount * mult)
      const won = mult > 1

      deductBalance(betAmount)
      if (won) addBalance(payout)

      recordBet(betAmount, won)
      setResult({
        won,
        message: `${mult}x Multiplier`,
        payout: won ? payout : undefined,
      })

      play(won ? 'coin' : 'lose')
      setPlaying(false)
    }, 800)
  }

  return (
    <GameLayout
      title="Plinko"
      icon="⚪"
      balance={balance}
      betAmount={betAmount}
      onBetChange={setBetAmount}
      onPlay={playGame}
      playing={playing}
      result={result}
    >
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="w-16 h-16 rounded-full bg-yellow-500/30 border-2 border-yellow-500 flex items-center justify-center">
          {multiplier ?? '?'}x
        </div>
      </div>
    </GameLayout>
  )
}
