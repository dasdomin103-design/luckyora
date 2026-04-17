export interface Tournament {
  id: string
  name: string
  entryFee: number
  prizePool: number
  playersJoined: number
  maxPlayers: number
  startsIn: string
}

export const TOURNAMENTS: Tournament[] = [
  { id: 't1', name: 'Teen Patti Masters', entryFee: 20, prizePool: 500, playersJoined: 18, maxPlayers: 50, startsIn: '2h 30m' },
  { id: 't2', name: 'Poker Championship', entryFee: 100, prizePool: 2000, playersJoined: 45, maxPlayers: 100, startsIn: '5h 15m' },
  { id: 't3', name: 'Rummy Rush', entryFee: 50, prizePool: 750, playersJoined: 32, maxPlayers: 64, startsIn: '1h 0m' },
]
