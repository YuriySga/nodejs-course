import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.save({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;

    return result;
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findByLogPas(login, pass): Promise<any> {
    const user = await this.usersRepository.findOne({ login: login });

    if (!user) {
      return undefined;
    }

    const compare = await bcrypt.compare(pass, user.password);

    return compare ? user : undefined;
  }

  async findOne(id: string): Promise<UserDto> {
    return await this.usersRepository.findOne({ id: id });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<undefined | UserDto> {
    const oldUser = await this.findOne(id);

    if (!oldUser) {
      return undefined;
    }

    this.usersRepository.merge(oldUser, updateUserDto);

    return await this.usersRepository.save(oldUser);
  }

  async remove(id: string): Promise<DeleteResult> {
    const usersTasks = await this.tasksRepository.find({
      where: { userId: id },
    });

    await usersTasks.map(async (task) => {
      this.tasksRepository.merge(task, { userId: null });
      await this.tasksRepository.save(task);
    });

    return await this.usersRepository.delete(id);
  }

  /*  async createAdmin(user) {
    const admin = await this.findByLogPas(user.password, user.login);

    if (!admin) {
      this.create(user);
    }
  } */
}
