import { ILogin } from "../../common/types";
import * as loginRepo from "./login.repository";
 
export const getToken = async (userData: ILogin): Promise<string | undefined> => loginRepo.getToken(userData);