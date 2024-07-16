import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  accessSecretKey: process.env.ACCESS_SECRET_KEY,
  refreshSecretKey: process.env.REFRESH_SECRET_KEY,
  recoverySecretKey: process.env.RECOVERY_SECRET_KEY,
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3333,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    schema: process.env.DB_SCHEMA || '',
  }
}));
