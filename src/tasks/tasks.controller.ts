import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('boardId') boardId: string,
    @Res() res: Response
  ) {
    try {
      const taskData = {
        task: createTaskDto,
        boardId: boardId,
      };

      const task = await this.tasksService.create(taskData);
      res.status(HttpStatus.CREATED).send(task);
    } catch (err) {
      console.log(err.msg);
      res.status(HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Param('boardId') boardId: string,
    @Res() res: Response
  ): Promise<void> {
    const result = await this.tasksService.findAll(boardId);
    res.status(HttpStatus.OK).send(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Param('boardId') boardId: string,
    @Res() res: Response
  ) {
    const task = await this.tasksService.findOne({
      taskId: id,
      boardId: boardId,
    });

    if (!task) {
      res.status(HttpStatus.NOT_FOUND).send('Not found');
    }
    res.status(HttpStatus.OK).send(task);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Param('boardId') boardId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response
  ) {
    const taskData = {
      taskId: id,
      boardId: boardId,
      task: updateTaskDto,
    };

    const task = await this.tasksService.update(taskData);

    if (task) {
      res.status(HttpStatus.OK).send(task);
    } else {
      res.status(HttpStatus.BAD_REQUEST).send('Bad request');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Param('boardId') boardId: string,
    @Res() res: Response
  ): Promise<void> {
    const result = await this.tasksService.remove(id, boardId);

    if (result.affected && result.affected > 0) {
      res.status(HttpStatus.OK).send('OK');
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Not found');
    }
  }
}
