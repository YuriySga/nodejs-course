import { HttpStatus, Put, Res, UseGuards } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @Res() res: Response
  ): Promise<void> {
    try {
      const board = await this.boardsService.create(createBoardDto);
      res.status(HttpStatus.CREATED).send(board);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatus.BAD_REQUEST).send(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const result = await this.boardsService.findAll();
    res.status(HttpStatus.OK).send(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const board = await this.boardsService.findOne(id);
      if (board) {
        res.status(HttpStatus.OK).send(board);
      }
    } catch (err) {
      res.status(HttpStatus.NOT_FOUND).send(err);
    }
    res.status(HttpStatus.NOT_FOUND).send('Not found');
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @Res() res: Response
  ) {
    const board = await this.boardsService.update(id, updateBoardDto);

    if (board) {
      res.status(HttpStatus.OK).send(board);
    } else {
      res.status(HttpStatus.BAD_REQUEST).send('Bad request');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const result = await this.boardsService.remove(id);

    if (result.affected && result.affected > 0) {
      res.status(HttpStatus.OK).send();
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
