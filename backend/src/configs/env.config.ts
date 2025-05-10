import dotenv from 'dotenv';

dotenv.config();

function getEnvVariable(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || '';
}

export const ENV = {
  PORT: parseInt(getEnvVariable('PORT'), 10),
  MONGO_URI: getEnvVariable('MONGO_URI'),
  JWT_SECRET: getEnvVariable('JWT_SECRET'),
  NODE_ENV: getEnvVariable('NODE_ENV'),
  IS_PRODUCTION: getEnvVariable('NODE_ENV') === 'production',
  DOMAIN: getEnvVariable('DOMAIN'),
  FRONTEND_URL: getEnvVariable('FRONTEND_URL'),
  KEY_OF_ACCESS: getEnvVariable('KEY_OF_ACCESS'),
  KEY_OF_REFRESH: getEnvVariable('KEY_OF_REFRESH'),
};
