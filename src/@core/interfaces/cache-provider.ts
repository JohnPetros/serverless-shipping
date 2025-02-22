export interface CacheProvider {
  set(key: string, data: unknown): Promise<void>
  get(key: string): Promise<string | null>
  delete(key: string): Promise<void>
}
