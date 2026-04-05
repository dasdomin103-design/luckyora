'use client'

import { useState } from 'react'

interface TournamentJoinModalProps {
  isOpen: boolean
  onClose: () => void
  tournamentId: string
  tournamentName: string
  entryFee: number
}

export default function TournamentJoinModal({
  isOpen,
  onClose,
  tournamentId,
  tournamentName,
  entryFee
}: TournamentJoinModalProps) {
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleJoin = async () => {
    setLoading(true)
    console.log('Joining tournament:', tournamentId)
    setTimeout(() => {
      setLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-white mb-4">Join Tournament</h2>
        <p className="text-gray-400 mb-2">{tournamentName}</p>
        <p className="text-white mb-6">Entry Fee: <span className="text-yellow-400">₹{entryFee}</span></p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleJoin}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-lg text-black font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? 'Joining...' : 'Pay & Join'}
          </button>
        </div>
      </div>
    </div>
  )
}