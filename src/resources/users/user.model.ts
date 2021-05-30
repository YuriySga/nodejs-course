
import { randomUUID } from 'crypto';

export interface IUser {
  id?: string;
  name: string;
  login: string;
  password?: string;
}

export class User{
    id: string;

    name: string;

    login: string;

    password: string;

  constructor({
    id = randomUUID(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }


  static toResponse(user: User): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
