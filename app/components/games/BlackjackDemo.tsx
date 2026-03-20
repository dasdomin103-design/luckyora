'use client'

import { useState } from 'react'
import { useStore } from '@/app/store/useStore'
import { useSound } from '@/app/context/SoundContext'
import { GameLayout } from './GameLayout'
import { createDeck, drawCards, blackjackValue } from '@/app/lib/gameLogic'
import toast from 'react-hot-toast'

export function BlackjackDemo() {
  const { balance, deductBalance, addBalance, recordBet } = useStore()
  const { play } = useSound()
  const [betAmount, setBetAmount] = useState(10)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<{ won: boolean; message: string; payout?: number }>()
  const [playerCards, setPlayerCards] = useState<string[]>([])
  const [dealerCards, setDealerCards] = useState<string[]>([])
  const [phase, setPhase] = useState<'deal' | 'hit' | 'stand'>('deal')

  const deal = () => {
    if (balance < betAmount) {
      toast.error('Insufficient balance')
      return
    }
    setPlaying(true)
    setResult(undefined)
    setPhase('deal')
    play('card')

    deductBalance(betAmount)

    const deck = createDeck()
    const { cards: p1, remaining: r1 } = drawCards(deck, 2)
    const { cards: d1 } = drawCards(r1, 2)

    setPlayerCards(p1)
    setDealerCards([d1[0], '??'])

    const pVal = blackjackValue(p1)

    if (pVal === 21) {
      addBalance(betAmount * 2.5)
      recordBet(betAmount, true)
      setResult({ won: true, message: 'Blackjack!', payout: betAmount * 2.5 })
      setDealerCards(d1)
      play('win')
      setPlaying(false)
      return
    }

    setPhase('hit')
    setPlaying(false)
  }

  const hit = () => {
    play('card')
    const deck = createDeck()
    const used = [...playerCards, dealerCards[0]]
    const remaining = deck.filter((c) => !used.includes(c))
    const { cards: extra } = drawCards(remaining, 1)
    const newCards = [...playerCards, ...extra]
    setPlayerCards(newCards)

    if (blackjackValue(newCards) > 21) {
      recordBet(betAmount, false)
      setResult({ won: false, message: 'Bust!' })
      setDealerCards([dealerCards[0], deck.find((c) => !newCards.includes(c))!])
      play('lose')
      setPhase('deal')
    }
  }

  const stand = () => {
    play('click')
    setPhase('stand')
    setPlaying(true)

    const deck = createDeck()
    const allUsed = [...playerCards, dealerCards[0]]
    let dCards = [dealerCards[0], deck.find((c) => !allUsed.includes(c))!]
    let dVal = blackjackValue(dCards)

    while (dVal < 17) {
      const rem = deck.filter((c) => ![...playerCards, ...dCards].includes(c))
      const { cards: extra } = drawCards(rem, 1)
      dCards = [...dCards, ...extra]
      dVal = blackjackValue(dCards)
    }

    setDealerCards(dCards)

    const pVal = blackjackValue(playerCards)
    const won = dVal > 21 || pVal > dVal
    const push = pVal === dVal

    if (won) addBalance(betAmount * 2)
    if (push) addBalance(betAmount)

    recordBet(betAmount, won)
    setResult({
      won,
      message: push ? 'Push!' : won ? 'You Win!' : 'Dealer Wins',
      payout: won ? betAmount * 2 : push ? betAmount : undefined,
    })

    play(won ? 'win' : 'lose')
    setPlaying(false)
    setPhase('deal')
  }

  const canPlay = phase === 'deal' || (phase === 'hit' && blackjackValue(playerCards) < 21)

  return (
    <GameLayout
      title="Blackjack"
      icon="🂡"
      balance={balance}
      betAmount={betAmount}
      onBetChange={setBetAmount}
      onPlay={phase === 'deal' ? deal : () => {}}
      playing={playing}
      result={result}
    >
      <div className="flex flex-col gap-6 py-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">Dealer ({dealerCards.length > 0 && dealerCards[1] !== '??' ? blackjackValue(dealerCards) : '?'})</p>
          <div className="flex gap-2">
            {dealerCards.map((c, i) => (
              <div key={i} className="w-12 h-16 bg-white text-black rounded-lg flex items-center justify-center font-bold text-sm border-2 border-gray-500">
                {c}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">You ({blackjackValue(playerCards)})</p>
          <div className="flex gap-2">
            {playerCards.map((c, i) => (
              <div key={i} className="w-12 h-16 bg-white text-black rounded-lg flex items-center justify-center font-bold text-sm border-2 border-yellow-500">
                {c}
              </div>
            ))}
          </div>
        </div>
        {phase === 'hit' && (
          <div className="flex gap-2">
            <button onClick={hit} className="flex-1 py-2 bg-green-600 rounded-lg font-bold">
              Hit
            </button>
            <button onClick={stand} className="flex-1 py-2 bg-red-600 rounded-lg font-bold">
              Stand
            </button>
          </div>
        )}
      </div>
    </GameLayout>
  )
}
