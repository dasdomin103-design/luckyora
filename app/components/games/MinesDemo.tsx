'use client'

import { useState } from 'react'
import { useStore } from '@/app/store/useStore'
import { useSound } from '@/app/context/SoundContext'
import { GameLayout } from './GameLayout'
import { shuffle } from '@/app/lib/gameLogic'
import toast from 'react-hot-toast'

const GRID_SIZE = 25
const MINE_COUNT = 5

export function MinesDemo() {
  const { balance, deductBalance, addBalance, recordBet } = useStore()
  const { play } = useSound()
  const [betAmount, setBetAmount] = useState(10)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<{ won: boolean; message: string; payout?: number }>()
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [mines, setMines] = useState<Set<number>>(new Set())
  const [gameOver, setGameOver] = useState(false)

  const playGame = () => {
    if (balance < betAmount) {
      toast.error('Insufficient balance')
      return
    }
    setPlaying(true)
    setResult(undefined)
    setRevealed(new Set())
    setGameOver(false)
    const mineSet = new Set(shuffle([...Array(GRID_SIZE).keys()]).slice(0, MINE_COUNT))
    setMines(mineSet)
    deductBalance(betAmount)
    play('click')
  }

  const reveal = (i: number) => {
    if (!playing || revealed.has(i) || gameOver) return
    play('click')

    if (mines.has(i)) {
      setGameOver(true)
      recordBet(betAmount, false)
      setResult({ won: false, message: 'Mine!' })
      play('lose')
      setPlaying(false)
      return
    }

    const newRevealed = new Set(revealed)
    newRevealed.add(i)
    setRevealed(newRevealed)

    const safeCount = newRevealed.size
    const mult = 1 + safeCount * 0.5
    addBalance(Math.floor(betAmount * mult * 0.2))
    play('coin')
  }

  const cashOut = () => {
    if (!playing || gameOver) return
    const safeCount = revealed.size
    const mult = 1 + safeCount * 0.5
    const payout = Math.floor(betAmount * mult)
    addBalance(payout)
    recordBet(betAmount, true)
    setResult({ won: true, message: `Cashed ${safeCount} gems`, payout })
    play('win')
    setGameOver(true)
    setPlaying(false)
  }

  return (
    <GameLayout
      title="Mines"
      icon="💣"
      balance={balance}
      betAmount={betAmount}
      onBetChange={setBetAmount}
      onPlay={playGame}
      playing={playing}
      result={result}
    >
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: GRID_SIZE }, (_, i) => (
            <button
              key={i}
              onClick={() => reveal(i)}
              disabled={!playing || gameOver}
              className={`w-12 h-12 rounded-lg font-bold ${
                revealed.has(i)
                  ? 'bg-green-600/50'
                  : mines.has(i) && gameOver
                    ? 'bg-red-600'
                    : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {revealed.has(i) ? '💎' : mines.has(i) && gameOver ? '💣' : '?'}
            </button>
          ))}
        </div>
        {playing && !gameOver && revealed.size > 0 && (
          <button
            onClick={cashOut}
            className="px-6 py-2 bg-green-600 rounded-lg font-bold"
          >
            Cash Out
          </button>
        )}
      </div>
    </GameLayout>
  )
}
