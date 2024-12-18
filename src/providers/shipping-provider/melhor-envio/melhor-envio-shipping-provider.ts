import type { MelhorEnvioQuote, MelhorEnvioToken } from './types'
import type { Jwt, Product, Quote } from '@core/types'
import type { ApiClientProvider, ShippingProvider } from '@core/interfaces'
import { ENV } from '@constants/index'

const MELHOR_ENVIO_REDIRECT_URI = '/auth/callback'

export class MelhorEnvioShippingProvider implements ShippingProvider {
  private api: ApiClientProvider

  constructor(api: ApiClientProvider) {
    this.api = api

    api.setBaseUrl(ENV.melhorEnvioUrl)
  }
  async calculateQuotes(
    products: Product[],
    zipcode: string,
    token: string,
  ): Promise<Quote[]> {
    this.api.setBearerToken(token)

    const quotes = await this.api.post<MelhorEnvioQuote[]>(
      '/api/v2/me/Shipping/calculate',
      {
        from: {
          postal_code: zipcode,
        },
        to: {
          postal_code: ENV.originZipcode,
        },
        products: products.map((product) => ({
          width: product.width,
          height: product.height,
          length: product.length,
          weight: product.weight,
          insurance_value: product.price,
          quantity: product.quantity,
        })),
      },
    )

    return quotes
      .filter((quote) => !quote.error)
      .map((quote) => ({
        name: quote.name,
        service: quote.name,
        price: Number(quote.custom_price),
        days: quote.custom_delivery_time,
      }))
  }

  async getAuthUrl() {
    const uri = `oauth/authorize?client_id=${ENV.melhorEnvioClientId}&response_type=code&scope=shipping-calculate`

    return `${ENV.melhorEnvioUrl}/${uri}`
  }

  async getToken(code: string): Promise<Jwt> {
    const body = {
      grant_type: 'authorization_code',
      client_id: ENV.melhorEnvioClientId,
      client_secret: ENV.melhorEnvioSecret,
      redirect_uri: `${ENV.domain}/${MELHOR_ENVIO_REDIRECT_URI}`,
      code,
    }

    const { access_token, refresh_token } = await this.api.post<MelhorEnvioToken>(
      '/oauth/token',
      body,
    )

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    }
  }

  async refreshToken(refreshToken: string) {
    const body = {
      grant_type: 'refresh_token',
      client_id: ENV.melhorEnvioClientId,
      client_secret: ENV.melhorEnvioSecret,
      refresh_token: refreshToken,
    }

    const { access_token, refresh_token, expires_in } =
      await this.api.post<MelhorEnvioToken>('/oauth/token', body)

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    }
  }
}
