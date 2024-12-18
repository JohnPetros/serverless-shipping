import { AwsHttp } from '@app/aws/aws-http'
import type { AwsEvent } from '@app/aws/types'
import { middyfy } from '@app/middyfy'
import { AuthorizeHandler } from '@core/handlers'
import { ApiClientProvider } from '@providers/api-client-provider'
import { ShippingProvider } from '@providers/shipping-provider'

function authorize(event: AwsEvent) {
  const http = new AwsHttp(event)
  const apiClientProvider = new ApiClientProvider()
  const shippingProvider = new ShippingProvider(apiClientProvider)
  const handler = new AuthorizeHandler(shippingProvider)

  return handler.handle(http)
}

export const handler = middyfy(authorize)
