/* eslint-disable @typescript-eslint/naming-convention */
// import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); */

/* dotenv.config({
    path: path.join(__dirname, '../../.env')
}); */

export const config = {
    type: 'postgres',
    synchronize: true,
    host: process.env['POSTGRES_HOST'],
    port: process.env['POSTGRES_PORT'],
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],   
    autoReconnect: true,
    reconnectTries: 10,
    reconnectInterval: 1000
} as ConnectionOptions;


