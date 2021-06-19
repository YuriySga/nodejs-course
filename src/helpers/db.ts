import {  ConnectionManager, createConnection } from "typeorm";
import { config } from "../common/ormconfig";

const connectToDB = async () => {

    const connectionManager = new ConnectionManager();

    const connection = connectionManager.create(config);    

    try {
        if (connection) {
            if (!connection.isConnected) {
                await connection.connect();
            };
        } else {
            await createConnection(config);
        };

        console.log('succesfully connected');

    } catch(err) {
        console.log('error2 ', err);
    }; 
};

export const TryDBConnect = async ( cb: () => void ) => {
    try {
        connectToDB()
        .then(()=>cb());
    } catch(err) {
        console.error('DB connection error ', err);
    }
}