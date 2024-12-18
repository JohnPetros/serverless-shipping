import middy from '@middy/core'
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import type { AwsEvent } from './aws/types'

export function middyfy(awsFunction: (event: AwsEvent) => void, schema?: object) {
  const middlewares = [middyJsonBodyParser()]

  if (schema)
    middlewares.push(
      validator({
        eventSchema: transpileSchema(schema),
      }),
    )

  return middy(awsFunction).use(middlewares)
}
