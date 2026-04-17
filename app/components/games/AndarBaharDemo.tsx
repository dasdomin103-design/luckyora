'use client'

import { useState } from 'react'
import { useStore } from '@/app/store/useStore'
import { useSound } from '@/app/context/SoundContext'
import { GameLayout } from './GameLayout'
import { andarBaharResult } from '@/app/lib/gameLogic'
import toast from 'react-hot-toast'

export function AndarBaharDemo() {
  const { balance, deductBalance, addBalance, recordBet } = useStore()
  const { play } = useSound()
  const [betAmount, setBetAmount] = useState(10)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<{ won: boolean; message: string; payout?: number }>()
  const [choice, setChoice] = useState<'andar' | 'bahar' | null>(null)
  const [outcome, setOutcome] = useState<'andar' | 'bahar' | null>(null)

  const playGame = (pick: 'andar' | 'bahar') => {
    if (balance < betAmount) {
      toast.error('Insufficient balance')
      return
    }
    setPlaying(true)
    setResult(undefined)
    setChoice(pick)
    setOutcome(null)
    play('card')

    setTimeout(() => {
      const res = andarBaharResult()
      setOutcome(res)
      const won = pick === res

      deductBalance(betAmount)
      const payout = won ? betAmount * 2 : 0
      if (won) addBalance(payout)

      recordBet(betAmount, won)
      setResult({
        won,
        message: won ? `${res.toUpperCase()} - You Win!` : `${res.toUpperCase()} - You Lose`,
        payout: won ? payout : undefined,
      })

      play(won ? 'win' : 'lose')
      setPlaying(false)
    }, 600)
  }

  return (
    <GameLayout
      title="Andar Bahar"
      icon="🃏"
      balance={balance}
      betAmount={betAmount}
      onBetChange={setBetAmount}
      onPlay={() => {}}
      playing={playing}
      result={result}
      hidePlayButton
    >
      <div className="flex flex-col gap-4 py-4">
        <p className="text-gray-400 text-center">Choose Andar or Bahar</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => !playing && playGame('andar')}
            disabled={playing}
            className={`flex-1 py-4 rounded-xl font-bold ${
              choice === 'andar'
                ? 'bg-green-600 ring-2 ring-green-400'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            ANDAR
          </button>
          <button
            onClick={() => !playing && playGame('bahar')}
            disabled={playing}
            className={`flex-1 py-4 rounded-xl font-bold ${
              choice === 'bahar'
                ? 'bg-green-600 ring-2 ring-green-400'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            BAHAR
          </button>
        </div>
        {outcome && (
          <p className="text-center text-xl font-bold text-yellow-400">
            Result: {outcome.toUpperCase()}
          </p>
        )}
      </div>
    </GameLayout>
  )
}
