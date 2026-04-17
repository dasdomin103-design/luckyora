import { NextResponse } from 'next/server'
import crypto from 'crypto'

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
    const { serverSeed, clientSeed } = await request.json()

    if (!serverSeed || !clientSeed) {
      return NextResponse.json({ error: 'Missing seeds' }, { status: 400 })
    }

    const hashedServerSeed = hashSeed(serverSeed)
    const crashPoint = getCrashResult(serverSeed, clientSeed)

    return NextResponse.json({
      crashPoint,
      hashedServerSeed,
      verified: true,
    })
  } catch (e) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
