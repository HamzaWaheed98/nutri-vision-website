import { Redis } from 'ioredis'

const redis = new Redis(process.env.REDIS_URL || '')

const RATE_LIMITS = {
  free: 100,      // 100 requests per month
  pro: 5000,      // 5000 requests per month
  enterprise: -1   // unlimited
} as const

export async function checkRateLimit(userId: string, plan: keyof typeof RATE_LIMITS) {
  try {
    const key = `rate_limit:${userId}`
    
    // Get current usage
    const usage = await redis.get(key)
    const currentUsage = usage ? parseInt(usage) : 0
    
    // Check if within limit
    const limit = RATE_LIMITS[plan]
    if (limit !== -1 && currentUsage >= limit) {
      return { allowed: false }
    }
    
    // Increment usage
    await redis.incr(key)
    if (!usage) {
      // Set expiry for new keys (1 month)
      await redis.expire(key, 30 * 24 * 60 * 60)
    }
    
    return { allowed: true }
  } catch (error) {
    console.error('Error checking rate limit:', error)
    // In case of Redis error, allow the request but log the error
    return { allowed: true }
  }
}