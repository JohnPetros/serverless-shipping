import type { Jwt, Product, Quote } from 'src/@core/types/index'

export interface ShippingProvider {
  getAuthUrl(): Promise<string>
  getToken(code: string): Promise<Jwt>
  refreshToken(refreshToken: string): Promise<Jwt>
  calculateQuotes(products: Product[], zipcode: string, token: string): Promise<Quote[]>
}
