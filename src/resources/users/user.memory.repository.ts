import { userDB } from "../../common/inMemoryDb";
import { clearTaskUser } from "../tasks/task.service";
import { User, IUser } from "./user.model";

export const getAll = async (): Promise<User[]> => userDB;
export const get = async (id: string) => userDB.find(user => user.id === id);
export const create = async (user: IUser): Promise<User | undefined> => {
  const newUser = new User(user);
  userDB.push(newUser);
  return get(newUser.id);
};

export const del = async (id: string) => {
  const userIndex = userDB.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    userDB.splice(userIndex, 1);
    await clearTaskUser(id);
    return 204;
  }

  return 404;  
};

export const update = async (user: IUser) => del(user.id!)
  .then(status => {    
    if (status === 204) {
      const newUser = new User(user);
      return create(newUser);
    }

    return undefined;
  });
