import dotenv from 'dotenv';
import path from 'path';

export const { PORT } = process.env;
export const { TOKENJWT } = process.env;
export const { P_PASSWORD } = process.env;

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

module.exports = {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true'
};
