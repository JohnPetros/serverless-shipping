import type { AwsEvent } from '@app/aws/types'
import { AwsHttp } from '@app/aws/aws-http'
import { middyfy } from '@app/middyfy'
import { RefreshTokenHandler } from '@core/handlers'
import { ApiClientProvider } from '@providers/api-client-provider'
import { CacheProvider } from '@providers/cache-provider'
import { ShippingProvider } from '@providers/shipping-provider'

function refreshToken(event: AwsEvent) {
  const http = new AwsHttp(event)
  const apiClientProvider = new ApiClientProvider()
  const shippingProvider = new ShippingProvider(apiClientProvider)
  const cacheProvider = new CacheProvider()

  const handler = new RefreshTokenHandler(shippingProvider, cacheProvider)
  return handler.handle(http)
}

export const handler = middyfy(refreshToken)
