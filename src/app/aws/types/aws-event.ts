import type { APIGatewayProxyEvent } from 'aws-lambda'
import type { AwsSchema } from './aws-schema'

export type AwsEvent<Schema extends AwsSchema = any> = Omit<
  APIGatewayProxyEvent,
  'body' | 'pathParameters' | 'queryStringParameters'
> & {
  body?: Schema['body']
  pathParameters?: Schema['pathParameters']
  queryStringParameters?: Schema['queryStringParameters']
}
