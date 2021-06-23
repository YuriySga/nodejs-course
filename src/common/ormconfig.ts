import { ConnectionOptions } from 'typeorm';

import { User } from '../entities/User';
import { Board } from '../entities/Board';
import { BoardColumn } from '../entities/BoardColumn';
import { BoardTask } from '../entities/BoardTask';

export const config = {
    type: 'postgres',
    synchronize: true,
    logging: true,
    host: process.env['PLOCAL_HOST'],
    port: process.env['PLOCAL_PORT'],
    username: process.env['P_USER'],
    password: process.env['P_PASSWORD'],
    database: process.env['P_DB'],   
    autoReconnect: true,
    reconnectTries: 10,
    reconnectInterval: 1000,
    entities: [User, Board, BoardColumn, BoardTask],
    migrations: ["migration/*.ts"],
    cli: {
        "migrationsDir": "migration"
    }
} as ConnectionOptions;


