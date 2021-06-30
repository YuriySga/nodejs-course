import { Injectable } from '@nestjs/common';

@Injectable()
class InMemoryUserStorage {
  private users: any[] = [
    {
      login: 'eeeeee',
      pass: 'qqqqq',
    },
  ];

  findAll = () => {
    console.log(44444);
    return this.users;
  };
}

export default InMemoryUserStorage;
