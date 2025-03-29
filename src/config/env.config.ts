export const EnvConfiguration = () => ({
  ENVIRONMENT: process.env.NODE_ENV || 'dev',
  DB_HOST: process.env.DB_HOST,
  DB_PORT: +process.env.DB_PORT || 3000,
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
  DB_NAME: process.env.DB_NAME,
});
