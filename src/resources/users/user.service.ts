import { IUser, User } from './user.model';
import * as usersRepo from './user.memory.repository';

export const getAll = async (): Promise<User[]> => usersRepo.getAll();
export const get = async (id: string) => usersRepo.get(id);
export const create = async (user: IUser) => usersRepo.create(user);
export const update = async (user: IUser) => usersRepo.update(user);
export const del = async (id: string) => usersRepo.del(id);

