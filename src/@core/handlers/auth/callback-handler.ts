import { CACHE_KEYS, HTTP_STATUS_CODE } from '@core/constants'
import type { Http, ShippingProvider } from '@core/interfaces'
import type { CacheProvider } from '@providers/cache-provider'

type Schema = {
  queryParams: {
    code: string
  }
}

export class CallbackHandler {
  constructor(
    private readonly shippingProvider: ShippingProvider,
    private readonly cacheProvider: CacheProvider,
  ) {}

  async handle(http: Http<Schema>) {
    const { code } = http.getQueryParams()
    const jwt = await this.shippingProvider.getToken(code)

    await Promise.all([
      this.cacheProvider.set(CACHE_KEYS.accessToken, jwt.accessToken),
      this.cacheProvider.set(CACHE_KEYS.refreshToken, jwt.refreshToken),
    ])

    return http.send({ jwt }, HTTP_STATUS_CODE.ok)
  }
}
