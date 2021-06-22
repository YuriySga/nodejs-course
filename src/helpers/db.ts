import {   createConnection, getConnection } from "typeorm";
import { config } from "../common/ormconfig";

const connectToDB = async () => {
   let connection;

   try {
    connection = getConnection();
   } catch(err) {
    console.log('error ', err);
   }

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