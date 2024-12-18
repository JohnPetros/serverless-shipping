if (
  !process.env.DOMAIN ||
  !process.env.ORIGIN_ZIPCODE ||
  !process.env.MELHOR_ENVIO_CLIENT_ID ||
  !process.env.MELHOR_ENVIO_SECRET ||
  !process.env.MELHOR_ENVIO_URL ||
  !process.env.MELHOR_ENVIO_REDIRECT_URI ||
  !process.env.MELHOR_ENVIO_API_URL
)
  throw Error('Enviroment variables are incorrect')

const ENV = {
  domain: process.env.DOMAIN,
  originZipcode: process.env.ORIGIN_ZIPCODE,
  melhorEnvioClientId: process.env.MELHOR_ENVIO_CLIENT_ID,
  melhorEnvioSecret: process.env.MELHOR_ENVIO_SECRET,
  melhorEnvioUrl: process.env.MELHOR_ENVIO_URL,
  melhorEnvioRedirectUri: process.env.MELHOR_ENVIO_REDIRECT_URI,
  melhorEnvioApiUrl: process.env.MELHOR_ENVIO_API_URL,
}

export { ENV }
