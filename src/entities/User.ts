import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../common/types';

@Entity({ name: 'users' })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column('varchar', {length: 25})
    name: string

  @Column('varchar', {length: 25})
    login: string

  @Column('varchar', {length: 25})
    password: string

  static toResponse(user: User): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}  


