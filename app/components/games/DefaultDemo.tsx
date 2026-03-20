'use client'

import { useState } from 'react'
import { useStore } from '@/app/store/useStore'
import { useSound } from '@/app/context/SoundContext'
import { GameLayout } from './GameLayout'
import toast from 'react-hot-toast'

interface DefaultDemoProps {
  title: string
  icon: string
}

export function DefaultDemo({ title, icon }: DefaultDemoProps) {
  const { balance, deductBalance, addBalance, recordBet } = useStore()
  const { play } = useSound()
  const [betAmount, setBetAmount] = useState(10)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<{ won: boolean; message: string; payout?: number }>()

  const playGame = () => {
    if (balance < betAmount) {
      toast.error('Insufficient balance')
      return
    }
    setPlaying(true)
    setResult(undefined)
    play('click')

    setTimeout(() => {
      const won = Math.random() < 0.45
      deductBalance(betAmount)
      const payout = won ? betAmount * 2 : 0
      if (won) addBalance(payout)

      recordBet(betAmount, won)
      setResult({
        won,
        message: won ? 'You Win!' : 'You Lose',
        payout: won ? payout : undefined,
      })

      play(won ? 'win' : 'lose')
      setPlaying(false)
    }, 800)
  }

  return (
    <GameLayout
      title={title}
      icon={icon}
      balance={balance}
      betAmount={betAmount}
      onBetChange={setBetAmount}
      onPlay={playGame}
      playing={playing}
      result={result}
    >
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <p>Place bet and play!</p>
      </div>
    </GameLayout>
  )
}
