export default {
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    url: process.env.REDIS_URL,
    // db: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB) : 10,
  },
}
