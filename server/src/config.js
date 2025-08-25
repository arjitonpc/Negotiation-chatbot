
export const config = {
  port: process.env.PORT || 4000,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  dataPath: process.env.DATA_PATH || new URL('../..//database/data.json', import.meta.url).pathname
}
