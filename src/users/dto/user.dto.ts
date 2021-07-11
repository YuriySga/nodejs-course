import { User } from '../entities/user.entity';

export class UserDto extends User {
  id!: string;
  name!: string;
  login!: string;
}
