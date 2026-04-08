import { Redis } from '@upstash/redis'

if (!process.env.UPSTASH_REDIS_REST_URL) {
    throw new Error('UPSTASH_REDIS_REST_URL is not set')
}

export const redis = Redis.fromEnv()
