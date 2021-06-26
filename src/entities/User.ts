import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { IUser } from '../common/types';

@Entity({ name: 'users' })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column('varchar')
    name: string

  @Column('varchar')
    login: string

  @Column({type: 'varchar'})
    password: string

  static toResponse(user: User): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}  


