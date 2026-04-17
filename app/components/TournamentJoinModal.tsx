'use client'

import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

interface Tournament {
  id: string
  name: string
  entryFee: number
  prizePool: number
  playersJoined: number
  maxPlayers: number
}

interface TournamentJoinModalProps {
  tournament: Tournament
  isOpen: boolean
  onClose: () => void
}

export function TournamentJoinModal({
  tournament,
  isOpen,
  onClose,
}: TournamentJoinModalProps) {
  const { balance, joinTournament } = useStore()

  if (!isOpen) return null

  const handleJoin = () => {
    if (balance < tournament.entryFee) {
      toast.error('Insufficient balance')
      return
    }
    const success = joinTournament(tournament.id, tournament.entryFee)
    if (success) {
      toast.success('You joined the tournament successfully!')
      onClose()
    } else {
      toast.error('Could not join. Check balance or if already joined.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">
          Join Tournament
        </h2>
        <p className="text-gray-300 mb-2">{tournament.name}</p>
        <div className="space-y-2 text-sm text-gray-400 mb-6">
          <p>Entry: ₹{tournament.entryFee}</p>
          <p>Prize Pool: ₹{tournament.prizePool}</p>
          <p>
            Players: {tournament.playersJoined}/{tournament.maxPlayers}
          </p>
        </div>
        <p className="text-sm text-gray-500 mb-4">Your balance: ₹{balance}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleJoin}
            className="flex-1 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
          >
            Join ₹{tournament.entryFee}
          </button>
        </div>
      </div>
    </div>
  )
}
