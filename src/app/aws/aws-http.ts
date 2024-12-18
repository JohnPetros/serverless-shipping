import type { Http } from 'src/@core/interfaces/index'
import type { AwsEvent, AwsSchema } from '@app/aws/types'
import { HTTP_STATUS_CODE } from '@core/constants/http-status-code'
import { AppError } from '@core/errors'

export class AwsHttp<Schema extends AwsSchema>
  implements
    Http<{
      body?: Schema['body']
      routeParams?: Schema['pathParameters']
      queryParams?: Schema['queryStringParameters']
    }>
{
  constructor(private readonly event: AwsEvent<Schema>) {}

  send(data: unknown, statusCode: number = HTTP_STATUS_CODE.ok): unknown {
    return {
      statusCode,
      body: JSON.stringify(data),
    }
  }

  getBody() {
    if (!this.event.body) throw new AppError('Validation Error', 'Query Params not found')

    return this.event.body
  }

  getRouteParams() {
    if (!this.event.pathParameters)
      throw new AppError('Validation Error', 'Query Params not found')

    return this.event.pathParameters
  }

  getQueryParams() {
    if (!this.event.queryStringParameters)
      throw new AppError('Validation Error', 'Query Params not found')

    return this.event.queryStringParameters
  }
}
