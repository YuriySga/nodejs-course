import { DeleteResult, getRepository } from 'typeorm';
import { IUser } from "../../common/types";

// import { clearTaskUser } from "../tasks/task.service";
import { User } from '../../entities/User';

export const getAll = async (): Promise<IUser[]> =>  {    
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  return users.map(user => User.toResponse(user));
} 
 
export const get = async (id: string): Promise<IUser | undefined> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);;
  return user ? User.toResponse(user) : undefined;
  };

export const create = async (user: IUser): Promise<IUser | undefined> => {
  const userRepository = getRepository(User);
  const newUser = userRepository.create(user);
  const results = await userRepository.save(newUser);
  console.log(results);
  return get(newUser.id);
};

export const update = async (user: IUser): Promise<undefined | User> => {
  const userRepository = getRepository(User);
  const oldUser = await userRepository.findOne(user.id);  
  if (oldUser) {
    userRepository.merge(oldUser, user);
    const results = await userRepository.save(oldUser)
    return results;
  }

  return undefined;
} 

export const del = async (id: string): Promise<DeleteResult> => {
  const userRepository = getRepository(User);
  const result = await userRepository.delete(id);
  return result;
};


