import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService /* private readonly authService: AuthService */
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response
  ): Promise<void> {
    const user = await this.usersService.create(createUserDto);
    res.status(HttpStatus.CREATED).json(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const result = await this.usersService.findAll();
    res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(id);
      if (user) {
        res.status(HttpStatus.OK).json(user);
      }
    } catch (err) {
      res.status(HttpStatus.NOT_FOUND).json('User not found');
    }
    res.status(HttpStatus.NOT_FOUND).json('User not found');
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    if (user) {
      res.status(HttpStatus.OK).json(user);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json('Bad request');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const result = await this.usersService.remove(id);

    if (result.affected && result.affected > 0) {
      res.status(HttpStatus.OK).json('Ok');
    } else {
      res.status(HttpStatus.NOT_FOUND).json('Not found');
    }
  }
}
