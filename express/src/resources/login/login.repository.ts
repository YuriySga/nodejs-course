import { ILogin } from "../../common/types";
import { getByLogPas } from "../users/user.service";

const  jwt = require('jsonwebtoken');

export const getToken = async (userData: ILogin): Promise<string | undefined> => {
    if (!userData) {        
        throw new Error('no data in request');                
    }    

    const userId = await getByLogPas(userData);

    if (!userId) {
        return undefined;
    };
    
    const secretKey = process.env['JWT_SECRET_KEY'];   
    const token = jwt.sign({
        login: userData.login,
        userId,
    }, secretKey);


    return token;    
}