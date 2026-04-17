'use client'

import { useState } from 'react'
import { useStore } from '@/app/store/useStore'
import { useSound } from '@/app/context/SoundContext'
import { GameLayout } from './GameLayout'
import { createDeck, drawCards, teenPattiHandRank } from '@/app/lib/gameLogic'
import toast from 'react-hot-toast'

export function TeenPattiDemo() {
  const { balance, deductBalance, addBalance, recordBet } = useStore()
  const { play } = useSound()
  const [betAmount, setBetAmount] = useState(10)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<{ won: boolean; message: string; payout?: number }>()
  const [playerCards, setPlayerCards] = useState<string[]>([])
  const [dealerCards, setDealerCards] = useState<string[]>([])

  const playGame = () => {
    if (balance < betAmount) {
      toast.error('Insufficient balance')
      return
    }
    setPlaying(true)
    setResult(undefined)
    play('card')

    setTimeout(() => {
      const deck = createDeck()
      const { cards: pCards } = drawCards(deck, 3)
      const { cards: dCards } = drawCards(deck.slice(3), 3)

      setPlayerCards(pCards)
      setDealerCards(dCards)

      const pRank = teenPattiHandRank(pCards)
      const dRank = teenPattiHandRank(dCards)
      const won = pRank > dRank

      deductBalance(betAmount)
      const payout = won ? betAmount * 2 : 0
      if (won) addBalance(payout)

      recordBet(betAmount, won)
      setResult({
        won,
        message: won ? 'You Win!' : 'Dealer Wins',
        payout: won ? payout : undefined,
      })

      play(won ? 'win' : 'lose')
      setPlaying(false)
    }, 800)
  }

  return (
    <GameLayout
      title="Teen Patti"
      icon="🃏"
      balance={balance}
      betAmount={betAmount}
      onBetChange={setBetAmount}
      onPlay={playGame}
      playing={playing}
      result={result}
    >
      <div className="flex flex-col gap-6 py-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">Your Cards</p>
          <div className="flex gap-2">
            {playerCards.map((c, i) => (
              <div
                key={i}
                className="w-12 h-16 bg-white text-black rounded-lg flex items-center justify-center font-bold text-sm border-2 border-yellow-500"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Dealer Cards</p>
          <div className="flex gap-2">
            {dealerCards.map((c, i) => (
              <div
                key={i}
                className="w-12 h-16 bg-white text-black rounded-lg flex items-center justify-center font-bold text-sm border-2 border-gray-500"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </GameLayout>
  )
}
