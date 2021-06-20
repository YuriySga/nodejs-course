import { DeleteResult } from 'typeorm';
import { IUser } from '../../common/types';
import * as usersRepo from './user.memory.repository';

export const getAll = async (): Promise<IUser[]> => usersRepo.getAll();
export const get = async (id: string): Promise<IUser | undefined> => usersRepo.get(id);
export const create = async (user: IUser): Promise<IUser | undefined> => usersRepo.create(user);
export const update = async (user: IUser): Promise<IUser | undefined> => usersRepo.update(user);
export const del = async (id: string): Promise<DeleteResult> => usersRepo.del(id);

