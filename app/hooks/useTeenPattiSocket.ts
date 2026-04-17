'use client'

import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000'

export function useTeenPattiSocket(roomId: string | null, playerName: string) {
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([])
  const [connected, setConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!roomId) return

    const socket = io(SOCKET_URL)
    socketRef.current = socket

    socket.on('connect', () => {
      setConnected(true)
      socket.emit('join-room', { roomId, playerName })
    })

    socket.on('player-joined', (list: { id: string; name: string }[]) => {
      setPlayers(list)
    })

    socket.on('player-left', (list: { id: string; name: string }[]) => {
      setPlayers(list)
    })

    return () => {
      if (roomId) socket.emit('leave-room', { roomId })
      socket.disconnect()
      socketRef.current = null
      setConnected(false)
    }
  }, [roomId, playerName])

  const placeBet = (amount: number) => {
    if (roomId && socketRef.current) {
      socketRef.current.emit('place-bet', { roomId, amount })
    }
  }

  return { players, connected, placeBet }
}
