import type { ApiResponse } from '@core/responses/api-response'

export interface ApiClientProvider {
  get<Body>(url: string): Promise<ApiResponse<Body>>
  post<Body>(url: string, body: unknown): Promise<ApiResponse<Body>>
  setBaseUrl(url: string): void
  setBearerToken(token: string): void
  setHeader(key: string, value: string): void
  setParams(key: string, value: string): void
}
