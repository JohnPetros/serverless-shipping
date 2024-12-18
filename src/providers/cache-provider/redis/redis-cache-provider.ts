import Redis from 'ioredis'

import type { CacheProvider } from '@core/interfaces'

export class RedisCacheProvider implements CacheProvider {
  private redis: Redis

  constructor() {
    this.redis = new Redis(
      'rediss://default:AYGwAAIjcDFiMjMyZGUyODE0ZDc0NTJlYTM1YWIzYzg4ZDQxNjFlZXAxMA@many-wombat-33200.upstash.io:6379',
    )
  }

  async set(key: string, data: unknown): Promise<void> {
    await this.redis.set(key, JSON.stringify(data))
  }

  async get<Data = string>(key: string): Promise<Data | null> {
    const data = await this.redis.get(key)
    if (data) return JSON.parse(data)

    return null
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key)
  }
}
