import { redis } from '@/lib/redis';

export async function GET() {
  const now = Date.now();

  const online = await redis.zcount(
    'online_users',
    now - 300000,
    now
  );

  return Response.json({ online });
}
