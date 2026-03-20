import { NextResponse } from 'next/server'
import crypto from 'crypto'

function generateServerSeed() {
  return crypto.randomBytes(32).toString('hex')
}

function hashSeed(seed: string) {
  return crypto.createHash('sha256').update(seed).digest('hex')
}

function getCrashResult(serverSeed: string, clientSeed: string): number {
  const hash = crypto
    .createHmac('sha256', serverSeed)
    .update(clientSeed)
    .digest('hex')

  const h = parseInt(hash.slice(0, 13), 16)
  const crash = Math.max(1, (1000000 / (h % 1000000)) * 0.99)

  return Math.min(crash, 1000)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const clientSeed = body.clientSeed || `client_${Date.now()}`
    const serverSeed = generateServerSeed()
    const hashedServerSeed = hashSeed(serverSeed)
    const crashPoint = getCrashResult(serverSeed, clientSeed)

    return NextResponse.json({
      crashPoint,
      hashedServerSeed,
      clientSeed,
      serverSeed, // In production, reveal only after round ends
    })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to generate' }, { status: 500 })
  }
}
