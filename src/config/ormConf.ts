import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env['PLOCAL_HOST'],
  port: Number(process.env['PLOCAL_PORT']),
  username: process.env['P_USER'],
  password: process.env['P_PASSWORD'],
  database: process.env['P_DB'],
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  logging: true,
  migrations: ['dist/migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
} as ConnectionOptions;
