if (
  !process.env.ORIGIN_ZIPCODE ||
  !process.env.MELHOR_ENVIO_CLIENT_ID ||
  !process.env.MELHOR_ENVIO_SECRET ||
  !process.env.MELHOR_ENVIO_URL ||
  !process.env.REDIS_URL ||
  !process.env.REDIS_TOKEN
)
  throw Error('Enviroment variables are not set')

const ENV = {
  originZipcode: process.env.ORIGIN_ZIPCODE,
  melhorEnvioClientId: process.env.MELHOR_ENVIO_CLIENT_ID,
  melhorEnvioSecret: process.env.MELHOR_ENVIO_SECRET,
  melhorEnvioUrl: process.env.MELHOR_ENVIO_URL,
  redisUrl: process.env.REDIS_URL,
  redisToken: process.env.REDIS_TOKEN,
}

export { ENV }
