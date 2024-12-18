import { HTTP_STATUS_CODE } from '@core/constants'
import type { Http, ShippingProvider } from '@core/interfaces'

export class AuthorizeHandler {
  constructor(private readonly shippingProvider: ShippingProvider) {}

  async handle(http: Http) {
    const authUrl = await this.shippingProvider.getAuthUrl()
    return http.send({ authUrl }, HTTP_STATUS_CODE.ok)
  }
}
