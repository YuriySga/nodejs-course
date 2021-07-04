import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { BoardDto } from './dto/board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const newBoard = this.boardsRepository.create(createBoardDto);
    const results = await this.boardsRepository.save(newBoard);
    return results;
  }

  async findAll(): Promise<BoardDto[]> {
    return await this.boardsRepository.find();
  }

  async findOne(id: string): Promise<BoardDto> {
    return await this.boardsRepository.findOne({ id: id });
  }

  async update(
    id: string,
    updateBoardDto: UpdateBoardDto
  ): Promise<undefined | BoardDto> {
    const oldBoard = await this.findOne(id);

    if (!oldBoard) {
      return undefined;
    }

    this.boardsRepository.merge(oldBoard, updateBoardDto);

    return await this.boardsRepository.save(oldBoard);
  }

  async remove(id: string): Promise<DeleteResult> {
    /* const tasksToDel = await this.tasksRepository.find({
      where: { boardId: id },
    });

    if (tasksToDel) {
      tasksToDel.map(async (task) => {
        await this.tasksRepository.delete(task.id);
      });
    } */

    await this.tasksRepository.delete({ boardId: id });

    return await this.boardsRepository.delete(id);
  }
}
