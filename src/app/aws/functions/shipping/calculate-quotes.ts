import { AwsHttp } from '@app/aws/aws-http'
import type { AwsEvent } from '@app/aws/types'
import { middyfy } from '@app/middyfy'
import { CalculateQuotesHandler } from '@core/handlers'
import { ApiClientProvider } from '@providers/api-client-provider'
import { CacheProvider } from '@providers/cache-provider'
import { ShippingProvider } from '@providers/shipping-provider'
import type { FromSchema } from 'json-schema-to-ts'

const schema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['zipcode', 'products'],
      properties: {
        zipcode: { type: 'string' },
        products: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'name',
              'sku',
              'quantity',
              'price',
              'length',
              'width',
              'height',
              'weight',
            ],
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              sku: { type: 'string' },
              quantity: { type: 'number' },
              price: { type: 'number' },
              length: { type: 'number' },
              width: { type: 'number' },
              height: { type: 'number' },
              weight: { type: 'number' },
            },
          },
        },
      },
    },
  },
} as const

type Schema = FromSchema<typeof schema>

function callculateQuotes(event: AwsEvent<Schema>) {
  const http = new AwsHttp<Schema>(event)
  const apiClientProvider = new ApiClientProvider()
  const shippingProvider = new ShippingProvider(apiClientProvider)
  const cacheProvider = new CacheProvider()

  const handler = new CalculateQuotesHandler(shippingProvider, cacheProvider)
  return handler.handle(http)
}

export const handler = middyfy(callculateQuotes, schema)
