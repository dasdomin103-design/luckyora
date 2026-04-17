'use client'

import { useState } from 'react'
import { useStore } from '@/app/store/useStore'
import { useSound } from '@/app/context/SoundContext'
import { GameLayout } from './GameLayout'
import { diceRoll } from '@/app/lib/gameLogic'
import toast from 'react-hot-toast'

export function DiceDemo() {
  const { balance, deductBalance, addBalance, recordBet } = useStore()
  const { play } = useSound()
  const [betAmount, setBetAmount] = useState(10)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<{ won: boolean; message: string; payout?: number }>()
  const [dice, setDice] = useState<number | null>(null)
  const [guess, setGuess] = useState<number>(4)

  const playGame = () => {
    if (balance < betAmount) {
      toast.error('Insufficient balance')
      return
    }
    setPlaying(true)
    setResult(undefined)
    setDice(null)
    play('click')

    setTimeout(() => {
      const roll = diceRoll()
      setDice(roll)
      const won = roll === guess

      deductBalance(betAmount)
      const payout = won ? betAmount * 6 : 0
      if (won) addBalance(payout)

      recordBet(betAmount, won)
      setResult({
        won,
        message: won ? `Correct! Rolled ${roll}` : `Rolled ${roll}`,
        payout: won ? payout : undefined,
      })

      play(won ? 'win' : 'lose')
      setPlaying(false)
    }, 600)
  }

  return (
    <GameLayout
      title="Dice Roll"
      icon="🎲"
      balance={balance}
      betAmount={betAmount}
      onBetChange={setBetAmount}
      onPlay={playGame}
      playing={playing}
      result={result}
    >
      <div className="flex flex-col items-center gap-6 py-6">
        <p className="text-gray-400">Guess the number (1-6)</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => !playing && setGuess(n)}
              className={`w-12 h-12 rounded-lg font-bold ${
                guess === n ? 'bg-yellow-500 text-black' : 'bg-gray-700'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="text-6xl">
          {dice ?? '?'}
        </div>
      </div>
    </GameLayout>
  )
}
