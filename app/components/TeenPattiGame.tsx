'use client'

import { useState } from 'react'
import { useTeenPattiSocket } from '@/app/hooks/useTeenPattiSocket'
import { useStore } from '@/app/store/useStore'
import toast from 'react-hot-toast'

interface TeenPattiGameProps {
  onBack: () => void
}

export function TeenPattiGame({ onBack }: TeenPattiGameProps) {
  const { balance, deductBalance } = useStore()
  const [betAmount, setBetAmount] = useState(10)
  const [roomId] = useState(() => `room_${Date.now()}`)
  const [playerName] = useState('Player')

  const { players, connected, placeBet } = useTeenPattiSocket(roomId, playerName)

  const handlePlaceBet = () => {
    if (balance < betAmount) {
      toast.error('Insufficient balance')
      return
    }
    const success = deductBalance(betAmount)
    if (success) {
      placeBet(betAmount)
      toast.success(`Bet ₹${betAmount} placed! Multiplayer connected.`)
    }
  }

  return (
    <div className="space-y-4">
      {connected && (
        <div className="flex gap-2 flex-wrap">
          {players.map((p) => (
            <span
              key={p.id}
              className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm"
            >
              {p.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm text-gray-400">
        {connected ? 'Connected to multiplayer room' : 'Connecting...'}
      </p>
      <div>
        <label className="text-sm text-gray-400">Bet Amount (₹)</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Math.max(10, parseInt(e.target.value) || 10))}
          className="block w-full mt-1 px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 text-white"
        />
      </div>
      <button
        onClick={handlePlaceBet}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl"
      >
        Place Bet ₹{betAmount}
      </button>
    </div>
  )
}
