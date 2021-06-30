import { DeleteResult } from 'typeorm';
import { ILogin, IUser } from '../../common/types';
import * as usersRepo from './user.memory.repository';

export const getAll = async (): Promise<IUser[]> => usersRepo.getAll();
export const get = async (id: string): Promise<IUser | undefined> => usersRepo.get(id);
export const getByLogPas = async (userData: ILogin): Promise<string | undefined> => usersRepo.getByLogPas(userData);
export const create = async (user: IUser): Promise<IUser | undefined> => usersRepo.create(user);
export const update = async (user: IUser): Promise<IUser | undefined> => usersRepo.update(user);
export const del = async (id: string): Promise<DeleteResult> => usersRepo.del(id);

export const createAdmin = async (user: IUser): Promise<void> => {
    const admin = await getByLogPas({
        password: user.password,
        login: user.login,
    })

    if (!admin) {
        usersRepo.create(user);        
    }
    
};


