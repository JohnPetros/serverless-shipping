import middy from '@middy/core'
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import middyJsonBodyParser from '@middy/http-json-body-parser'

import { ApiError, AppError } from '@core/errors'
import { HTTP_STATUS_CODE } from '@core/constants'
import type { AwsEvent } from './aws/types'

type ErrorResponse = {
  title: string
  message: string
  statusCode: number
  validationError?: unknown
}

export function middyfy(awsFunction: (event: AwsEvent) => void, schema?: object) {
  const middlewares = [middyJsonBodyParser()]

  if (schema)
    middlewares.push(
      validator({
        eventSchema: transpileSchema(schema),
      }),
    )

  return middy(awsFunction)
    .use(middlewares)
    .onError(({ error }) => {
      if (!error) return

      const errorResponse: ErrorResponse = {
        title: error.name,
        message: error.message,
        statusCode: HTTP_STATUS_CODE.serverError,
      }

      if (error && 'cause' in error) {
        errorResponse.title = 'Validation Error'
        errorResponse.message = error.message
        errorResponse.statusCode = HTTP_STATUS_CODE.badRequest
        errorResponse.validationError = error.cause
      }

      if (error instanceof AppError) {
        errorResponse.title = error.title
        errorResponse.message = error.message

        if (error instanceof ApiError) {
          errorResponse.title = error.title
          errorResponse.message = error.message
          errorResponse.statusCode = error.statusCode
        }
      }

      return {
        statusCode: errorResponse.statusCode,
        body: JSON.stringify(errorResponse),
      }
    })
}
