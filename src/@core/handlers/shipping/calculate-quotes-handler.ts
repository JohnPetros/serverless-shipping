import { CACHE_KEYS, HTTP_STATUS_CODE } from '@core/constants'
import { AuthError } from '@core/errors'
import type { Http, ShippingProvider } from '@core/interfaces'
import type { Product } from '@core/types'
import type { CacheProvider } from '@providers/cache-provider'

type Schema = {
  body: {
    zipcode: string
    products: Product[]
  }
}

export class CalculateQuotesHandler {
  constructor(
    private readonly shippingProvider: ShippingProvider,
    private readonly cacheProvider: CacheProvider,
  ) {}

  async handle(http: Http<Schema>) {
    const { zipcode, products } = http.getBody()

    const accessToken = await this.cacheProvider.get(CACHE_KEYS.accessToken)

    if (!accessToken) throw new AuthError('Access token not found')

    const quotes = await this.shippingProvider.calculateQuotes(
      zipcode,
      products,
      accessToken,
    )

    return http.send(quotes, HTTP_STATUS_CODE.ok)
  }
}
