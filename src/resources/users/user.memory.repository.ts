import { DeleteResult, getRepository } from 'typeorm';
import { ILogin, IUser } from "../../common/types";
import { User } from '../../entities/User';
import * as taskService from "../tasks/task.service";

const bcrypt = require('bcrypt');

export const getAll = async (): Promise<IUser[]> =>  {    
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  return users.map(user => User.toResponse(user));
} 
 
export const get = async (id: string): Promise<IUser | undefined> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  return user ? User.toResponse(user) : undefined;
};

export const getByLogPas = async (userData: ILogin): Promise<string | undefined> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ login: userData.login });

  if (!user) {
    return undefined;   
  }

  const compare = await bcrypt.compare(userData.password, user.password);
  return compare ? user.id : undefined;
};

export const create = async (user: IUser): Promise<IUser | undefined> => {
  const userRepository = getRepository(User);
  const newUser = userRepository.create({
    ...user, password: await bcrypt.hash(user.password, 10)
  });
  await userRepository.save(newUser);  
  return get(newUser.id);
};

export const update = async (user: IUser): Promise<undefined | User> => {

  const userRepository = getRepository(User);    
  const oldUser = await userRepository.findOne(user.id);  
  if (oldUser) {
    const updateUser = {login: user.login, password: user.password, name: user.name};
    userRepository.merge(oldUser, updateUser);
    const results = await userRepository.save(oldUser);
    return results;
  }

  return undefined;
};

export const del = async (id: string): Promise<DeleteResult> => {
  await taskService.clearTaskUser(id);
  const userRepository = getRepository(User);
  const result = await userRepository.delete(id);  
  return result;
};


