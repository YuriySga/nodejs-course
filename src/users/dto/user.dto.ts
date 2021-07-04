import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends User {
  id: string;
  name: string;
  login: string;
  password: string | undefined;
}
