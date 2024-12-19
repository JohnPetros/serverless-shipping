if (
  !process.env.ORIGIN_ZIPCODE ||
  !process.env.MELHOR_ENVIO_CLIENT_ID ||
  !process.env.MELHOR_ENVIO_SECRET ||
  !process.env.MELHOR_ENVIO_URL ||
  !process.env.MELHOR_ENVIO_API_URL ||
  !process.env.REDIS_URL
)
  throw Error('Enviroment variables are not set')

const ENV = {
  originZipcode: process.env.ORIGIN_ZIPCODE,
  melhorEnvioClientId: process.env.MELHOR_ENVIO_CLIENT_ID,
  melhorEnvioSecret: process.env.MELHOR_ENVIO_SECRET,
  melhorEnvioUrl: process.env.MELHOR_ENVIO_URL,
  melhorEnvioApiUrl: process.env.MELHOR_ENVIO_API_URL,
  redisUrl: process.env.REDIS_URL,
}

export { ENV }
