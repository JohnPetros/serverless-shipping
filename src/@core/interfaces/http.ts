export type HttpSchema = {
  body?: unknown
  routeParams?: unknown
  queryParams?: unknown
}

export interface Http<Schema extends HttpSchema = HttpSchema> {
  send(data: unknown, statusCode: number): unknown
  getBody(): Schema['body']
  getRouteParams(): Schema['routeParams']
  getQueryParams(): Schema['queryParams']
}
