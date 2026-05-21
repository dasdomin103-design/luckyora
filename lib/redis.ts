import { Redis } from '@upstash/redis';

// ============================================================================
// PHASE 10: REDIS STABILIZATION
// - Centralized Redis client with null-safe fallback
// - Validates env vars before initialization
// - Graceful degradation when Redis is unavailable
// ============================================================================

let redisInstance: Redis | null = null;
let redisError: Error | null = null;

function initializeRedis(): Redis | null {
  if (redisInstance) {
    return redisInstance;
  }

  try {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
      console.warn(
        '[Redis] Missing env vars: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN'
      );
      return null;
    }

    redisInstance = new Redis({
      url,
      token,
    });

    console.log('[Redis] ✅ Connected successfully');
    return redisInstance;
  } catch (error) {
    redisError = error instanceof Error ? error : new Error(String(error));
    console.error('[Redis] ❌ Initialization failed:', redisError.message);
    return null;
  }
}

/**
 * Get Redis instance (lazily initialized)
 * Returns null if Redis is unavailable
 */
export function getRedis(): Redis | null {
  if (!redisInstance && !redisError) {
    return initializeRedis();
  }
  return redisInstance;
}

/**
 * Check if Redis is available
 */
export function isRedisAvailable(): boolean {
  const client = getRedis();
  return client !== null;
}

/**
 * Safely execute Redis operations with fallback
 * @param operation - Async function that uses Redis
 * @param fallback - Value to return if Redis fails
 */
export async function withRedis<T>(
  operation: (redis: Redis) => Promise<T>,
  fallback: T
): Promise<T> {
  const redis = getRedis();
  if (!redis) {
    console.warn('[Redis] Operation skipped - Redis unavailable');
    return fallback;
  }

  try {
    return await operation(redis);
  } catch (error) {
    console.error(
      '[Redis] Operation failed:',
      error instanceof Error ? error.message : String(error)
    );
    return fallback;
  }
}

// Lazy export for direct access (DEPRECATED - use getRedis() instead)
export const redis = new Proxy({} as Redis, {
  get: (_, prop) => {
    const client = getRedis();
    if (!client) {
      throw new Error(
        'Redis is not available. Check UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.'
      );
    }
    return (client as any)[prop];
  },
});
