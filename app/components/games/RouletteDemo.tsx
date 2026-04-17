'use client'

import { useState } from 'react'
import { useStore } from '@/app/store/useStore'
import { useSound } from '@/app/context/SoundContext'
import { GameLayout } from './GameLayout'
import { rouletteSpin } from '@/app/lib/gameLogic'
import toast from 'react-hot-toast'

export function RouletteDemo() {
  const { balance, deductBalance, addBalance, recordBet } = useStore()
  const { play } = useSound()
  const [betAmount, setBetAmount] = useState(10)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<{ won: boolean; message: string; payout?: number }>()
  const [spinResult, setSpinResult] = useState<{ number: number; color: string } | null>(null)

  const playGame = () => {
    if (balance < betAmount) {
      toast.error('Insufficient balance')
      return
    }
    setPlaying(true)
    setResult(undefined)
    setSpinResult(null)
    play('card')

    setTimeout(() => {
      const { number: n, color } = rouletteSpin()
      setSpinResult({ number: n, color })

      // Simple bet: red/black 1:1, green 35:1
      const betColor = ['red', 'black'][Math.floor(Math.random() * 2)] as 'red' | 'black'
      const won = (betColor === 'red' && color === 'red') || (betColor === 'black' && color === 'black') || (color === 'green' && Math.random() < 0.1)

      deductBalance(betAmount)
      const payout = won ? (color === 'green' ? betAmount * 35 : betAmount * 2) : 0
      if (won) addBalance(payout)

      recordBet(betAmount, won)
      setResult({
        won,
        message: `Landed on ${n} ${color}`,
        payout: won ? payout : undefined,
      })

      play(won ? 'win' : 'lose')
      setPlaying(false)
    }, 1500)
  }

  return (
    <GameLayout
      title="Roulette"
      icon="🎡"
      balance={balance}
      betAmount={betAmount}
      onBetChange={setBetAmount}
      onPlay={playGame}
      playing={playing}
      result={result}
    >
      <div className="flex flex-col items-center gap-4 py-6">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${
            spinResult?.color === 'red'
              ? 'bg-red-600'
              : spinResult?.color === 'black'
                ? 'bg-gray-800 border-2 border-white'
                : spinResult?.color === 'green'
                  ? 'bg-green-600'
                  : 'bg-gray-700'
          }`}
        >
          {spinResult?.number ?? '?'}
        </div>
        {spinResult && (
          <p className="text-yellow-400 font-semibold">
            {spinResult.color.toUpperCase()}
          </p>
        )}
      </div>
    </GameLayout>
  )
}
