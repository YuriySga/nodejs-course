import { IUser, User } from './user.model';
import * as usersRepo from './user.memory.repository';

export const getAll = async (): Promise<User[]> => usersRepo.getAll();
export const get = async (id: string): Promise<User | undefined> => usersRepo.get(id);
export const create = async (user: IUser): Promise<User | undefined> => usersRepo.create(user);
export const update = async (user: IUser): Promise<undefined | User> => usersRepo.update(user);
export const del = async (id: string): Promise<number> => usersRepo.del(id);

