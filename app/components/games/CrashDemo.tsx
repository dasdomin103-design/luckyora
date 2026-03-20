'use client'

import { useState, useEffect, useRef } from 'react'
import { useStore } from '@/app/store/useStore'
import { useSound } from '@/app/context/SoundContext'
import { GameLayout } from './GameLayout'
import toast from 'react-hot-toast'

const GROWTH_RATE = 0.002

function getMultiplier(time: number) {
  return Math.exp(GROWTH_RATE * time)
}

function generateCrashPointFallback() {
  const r = Math.random()
  if (r < 0.02) return 1
  return Math.max(1.1, (1 / (1 - r)) * 0.99)
}

export function CrashDemo() {
  const { balance, deductBalance, addBalance, recordBet } = useStore()
  const { play } = useSound()
  const [betAmount, setBetAmount] = useState(10)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<{ won: boolean; message: string; payout?: number }>()
  const [multiplier, setMultiplier] = useState(1)
  const [running, setRunning] = useState(false)
  const [crashPoint, setCrashPoint] = useState(2)
  const [autoCashout, setAutoCashout] = useState(2)
  const [cashedOut, setCashedOut] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [lastRound, setLastRound] = useState<{
    crashPoint: number
    hashedServerSeed: string
    clientSeed: string
    serverSeed?: string
  } | null>(null)
  const gameRef = useRef({ betAmount: 0, crashPoint: 2, autoCashout: 2 })
  const cashedOutRef = useRef(false)

  const clientSeedRef = useRef<string | null>(null)
  const getClientSeed = () => {
    if (clientSeedRef.current) return clientSeedRef.current
    const seed = `seed_${Date.now()}_${Math.random().toString(36).slice(2)}`
    clientSeedRef.current = seed
    return seed
  }

  const fetchCrashPoint = async (): Promise<number> => {
    const clientSeed = getClientSeed()
    try {
      const res = await fetch('/api/crash/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientSeed }),
      })
      const data = await res.json()
      if (data.crashPoint) {
        setLastRound({
          crashPoint: data.crashPoint,
          hashedServerSeed: data.hashedServerSeed,
          clientSeed: data.clientSeed,
          serverSeed: data.serverSeed,
        })
        return data.crashPoint
      }
    } catch {}
    const fallback = generateCrashPointFallback()
    setLastRound({
      crashPoint: fallback,
      hashedServerSeed: 'N/A (client-side fallback)',
      clientSeed,
      serverSeed: undefined,
    })
    return fallback
  }

  const startGame = async () => {
    if (balance < betAmount) {
      toast.error('Insufficient balance')
      return
    }
    const crash = await fetchCrashPoint()
    gameRef.current = { betAmount, crashPoint: crash, autoCashout }
    setCrashPoint(crash)
    setMultiplier(1)
    setRunning(true)
    setPlaying(true)
    setCashedOut(false)
    cashedOutRef.current = false
    setResult(undefined)
    setShowVerify(false)
    deductBalance(betAmount)
    play('click')
  }

  const manualCashOut = () => {
    if (!running || cashedOutRef.current) return
    cashedOutRef.current = true
    setCashedOut(true)
    setRunning(false)
    setPlaying(false)
    const payout = Math.floor(betAmount * multiplier)
    addBalance(payout)
    setResult({ won: true, message: `Cashed at ${multiplier.toFixed(2)}x`, payout })
    setShowVerify(true)
    play('coin')
    setTimeout(() => recordBet(betAmount, true), 0)
  }

  useEffect(() => {
    if (!running) return

    const start = Date.now()
    const { betAmount: amt, crashPoint: cp, autoCashout: aco } = gameRef.current

    const interval = setInterval(() => {
      const time = Date.now() - start
      const current = getMultiplier(time)

      if (current >= cp) {
        clearInterval(interval)
        setMultiplier(cp)
        setRunning(false)
        setPlaying(false)
        setResult({ won: false, message: `Crashed at ${cp.toFixed(2)}x` })
        setShowVerify(true)
        play('lose')
        setTimeout(() => recordBet(amt, false), 0)
        return
      }

      if (!cashedOutRef.current && current >= aco) {
        clearInterval(interval)
        cashedOutRef.current = true
        setCashedOut(true)
        setRunning(false)
        setPlaying(false)
        const payout = Math.floor(amt * current)
        addBalance(payout)
        setResult({ won: true, message: `Auto cashed at ${current.toFixed(2)}x`, payout })
        setShowVerify(true)
        play('coin')
        setTimeout(() => recordBet(amt, true), 0)
        return
      }

      setMultiplier(current)
    }, 50)

    return () => clearInterval(interval)
  }, [running])

  return (
    <GameLayout
      title="Crash"
      icon="📈"
      balance={balance}
      betAmount={betAmount}
      onBetChange={setBetAmount}
      onPlay={startGame}
      playing={playing}
      result={result}
    >
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="text-5xl font-bold text-green-400">
          {multiplier.toFixed(2)}x
        </div>

        {!playing && (
          <div className="w-full">
            <label className="text-sm text-gray-400">Auto cashout at (x)</label>
            <input
              type="number"
              value={autoCashout}
              onChange={(e) => setAutoCashout(Math.max(1.1, parseFloat(e.target.value) || 1.1))}
              min={1.1}
              step={0.1}
              className="w-full mt-1 px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 text-white"
            />
          </div>
        )}

        {playing && !cashedOut && (
          <button
            onClick={manualCashOut}
            className="px-8 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold"
          >
            CASH OUT
          </button>
        )}

        {lastRound && showVerify && (
          <div className="w-full mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-600 text-xs">
            <button
              onClick={() => setShowVerify((v) => !v)}
              className="text-yellow-400 font-semibold mb-2"
            >
              ✓ Provably Fair
            </button>
            <div className="text-gray-400 space-y-1">
              <p>Hashed Server Seed: {lastRound.hashedServerSeed.slice(0, 16)}...</p>
              <p>Client Seed: {lastRound.clientSeed}</p>
              <p>Crash: {lastRound.crashPoint.toFixed(2)}x</p>
              <p className="text-gray-500 text-[10px] mt-1">
                Verify at /api/crash/verify with serverSeed + clientSeed
              </p>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  )
}
