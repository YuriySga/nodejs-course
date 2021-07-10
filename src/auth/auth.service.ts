import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogPas(login, password);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { login: user.login, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}