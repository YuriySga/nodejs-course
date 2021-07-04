import { HttpStatus, Put, Res } from '@nestjs/common';
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
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @Res() res: Response
  ): Promise<void> {
    try {
      const board = await this.boardsService.create(createBoardDto);
      res.status(HttpStatus.CREATED).json(board);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatus.BAD_REQUEST).json(err.message);
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const result = await this.boardsService.findAll();
    res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const board = await this.boardsService.findOne(id);
      if (board) {
        res.status(HttpStatus.OK).json(board);
      }
    } catch (err) {
      res.status(HttpStatus.NOT_FOUND).json(err);
    }
    res.status(HttpStatus.NOT_FOUND).json('Not found');
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @Res() res: Response
  ) {
    const board = await this.boardsService.update(id, updateBoardDto);

    if (board) {
      res.status(HttpStatus.OK).json(board);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json('Bad request');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const result = await this.boardsService.remove(id);

    if (result.affected && result.affected > 0) {
      res.status(HttpStatus.OK).json();
    } else {
      res.status(HttpStatus.NOT_FOUND).json();
    }
  }
}
