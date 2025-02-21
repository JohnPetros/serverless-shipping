import { Redis } from '@upstash/redis'

import type { CacheProvider } from '@core/interfaces'
import { ENV } from '@constants/env'

export class RedisCacheProvider implements CacheProvider {
  private redis: Redis

  constructor() {
    this.redis = new Redis({
      url: 'https://able-halibut-18061.upstash.io',
      token: 'AUaNAAIjcDFhNjIyM2UyYjE4OWU0MjFkYTY5MDgzNzRhYzBlN2MwOHAxMA',
    })
  }

  async set(key: string, data: unknown): Promise<void> {
    await this.redis.set(key, JSON.stringify(data))
  }

  async get(key: string): Promise<string | null> {
    const data = await this.redis.get(key)
    if (data) return String(data)

    return null
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key)
  }
}
