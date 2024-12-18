export interface ApiClientProvider {
  get<Response>(url: string): Promise<Response>
  post<Response>(url: string, body: unknown): Promise<Response>
  setBaseUrl(url: string): void
  setBearerToken(token: string): void
  setHeader(key: string, value: string): void
  setParams(key: string, value: string): void
}
