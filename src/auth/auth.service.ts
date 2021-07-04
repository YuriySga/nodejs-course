import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(login: any, password: any): Promise<any> {
    console.log('user val');
    //const user = await this.usersService.findByLogPas(login, password);

    /*   if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null; */
    return await { login: 'admin', userId: '234234234' };
  }

  async login(user: any) {
    console.log('user');
    /* const payload = { login: user.login, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),      
    }; */
    return {
      access_token: this.jwtService.sign({
        login: 'admin',
        userId: '234234234',
      }),
    };
  }
}
