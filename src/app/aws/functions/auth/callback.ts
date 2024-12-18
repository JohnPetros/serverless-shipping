import { AwsHttp } from '@app/aws/aws-http'
import type { AwsEvent } from '@app/aws/types'
import { middyfy } from '@app/middyfy'
import { CallbackHandler } from '@core/handlers'
import { ApiClientProvider } from '@providers/api-client-provider'
import { CacheProvider } from '@providers/cache-provider'
import { ShippingProvider } from '@providers/shipping-provider'
import type { FromSchema } from 'json-schema-to-ts'

const schema = {
  type: 'object',
  required: ['queryStringParameters'],
  properties: {
    queryStringParameters: {
      type: 'object',
      required: ['code'],
      properties: {
        code: { type: 'string' },
      },
    },
  },
} as const

type Schema = FromSchema<typeof schema>

function callback(event: AwsEvent<Schema>) {
  const http = new AwsHttp<Schema>(event)
  const apiClientProvider = new ApiClientProvider()
  const shippingProvider = new ShippingProvider(apiClientProvider)
  const cacheProvider = new CacheProvider()

  const handler = new CallbackHandler(shippingProvider, cacheProvider)
  return handler.handle(http)
}

export const handler = middyfy(callback, schema)
