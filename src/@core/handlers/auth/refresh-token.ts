import { CACHE_KEYS, HTTP_STATUS_CODE } from '@core/constants'
import { AuthError } from '@core/errors'
import type { Http, ShippingProvider } from '@core/interfaces'
import type { CacheProvider } from '@providers/cache-provider'

export class RefreshTokenHandler {
  constructor(
    private readonly shippingProvider: ShippingProvider,
    private readonly cacheProvider: CacheProvider,
  ) {}

  async handle(http: Http) {
    const refreshToken = await this.cacheProvider.get(CACHE_KEYS.refreshToken)
    if (!refreshToken) throw new AuthError('Refresh token not found')

    const jwt = await this.shippingProvider.refreshToken(refreshToken)

    await Promise.all([
      this.cacheProvider.set(CACHE_KEYS.accessToken, jwt.accessToken),
      this.cacheProvider.set(CACHE_KEYS.refreshToken, jwt.refreshToken),
    ])

    return http.send({ jwt }, HTTP_STATUS_CODE.ok)
  }
}
