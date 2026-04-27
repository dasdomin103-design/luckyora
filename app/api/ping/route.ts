import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"

export async function GET() {
  const now = Date.now()

  await redis.zadd("online_users", {
    score: now,
    member: `${now}-${Math.random()}`
  })

  await redis.zremrangebyscore("online_users", 0, now - 300000)

  return NextResponse.json({ success: true })
}
