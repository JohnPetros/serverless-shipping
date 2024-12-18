import Axios, { isAxiosError, type AxiosInstance } from 'axios'

import type { ApiClientProvider } from '@core/interfaces'
import { ApiResponse } from '@core/responses'
import { HTTP_STATUS_CODE } from '@core/constants'

export class AxiosApiClientProvider implements ApiClientProvider {
  private axios: AxiosInstance

  constructor() {
    this.axios = Axios.create({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  setBaseUrl(baseUrl: string) {
    this.axios.defaults.baseURL = baseUrl
  }

  setBearerToken(token: string) {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  setAuth(username: string, password: string): void {
    this.axios.defaults.auth = {
      username,
      password,
    }
  }

  setHeader(key: string, value: string) {
    this.axios.defaults.headers[key] = value
  }

  setParams(key: string, value: string) {
    this.axios.defaults.params = {
      [key]: value,
    }
  }

  async get<Body>(url: string): Promise<ApiResponse<Body>> {
    try {
      const response = await this.axios.get(url)
      return new ApiResponse({ body: response.data, statusCode: response.status })
    } catch (error) {
      return this.handleApiError(error)
    }
  }

  async post<Body>(url: string, body: unknown): Promise<ApiResponse<Body>> {
    try {
      const response = await this.axios.post(url, body)
      return new ApiResponse({ body: response.data, statusCode: response.status })
    } catch (error) {
      return this.handleApiError(error)
    }
  }

  private handleApiError<ResponseBody>(error: unknown) {
    if (isAxiosError(error)) {
      console.log('Axios Error: ')
      console.log(error.response?.data)
      return new ApiResponse({
        errorMessage: error.response?.data.message,
        statusCode: error.response?.status,
      }) as ApiResponse<ResponseBody>
    }

    console.log(`Unknown Error: ${error}`)
    return new ApiResponse({
      errorMessage: 'Unknown error',
      statusCode: HTTP_STATUS_CODE.serverError,
    }) as ApiResponse<ResponseBody>
  }
}
