import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  login: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  /* validatePassword(password: string) {    
    return comparedToHashed(password, this.password, this.passwordSalt);
  } */
}
