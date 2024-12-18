export interface CacheProvider {
  set(key: string, data: unknown): Promise<void>
  get<Data = string>(key: string): Promise<Data | null>
  delete(key: string): Promise<void>
}
