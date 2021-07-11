import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async create(taskData: {
    task: CreateTaskDto;
    boardId: string;
  }): Promise<TaskDto> {
    const task = this.tasksRepository.create({
      ...taskData.task,
      boardId: taskData.boardId,
    });

    const results = await this.tasksRepository.save(task);
    return results;
  }

  async findAll(boardId: string): Promise<TaskDto[]> {
    return await this.tasksRepository.find({ boardId: boardId });
  }

  async findOne(ids: { taskId: string; boardId: string }) {
    return await this.tasksRepository.findOne({
      where: { boardId: `${ids.boardId}`, id: `${ids.taskId}` },
    });
  }

  async update(taskData: {
    task: CreateTaskDto;
    boardId: string;
    taskId: string;
  }) {
    const newTask = {
      ...taskData.task,
      boardId: taskData.boardId,
      taskId: taskData.taskId,
    };

    const oldTask = await this.tasksRepository.findOne(taskData.taskId);
    if (oldTask) {
      this.tasksRepository.merge(oldTask, newTask);
      const results = await this.tasksRepository.save(oldTask);
      return results;
    }
    return undefined;
  }

  async remove(id: string, boardId: string) {
    const result = await this.tasksRepository.delete({
      boardId: boardId,
      id: id,
    });
    return result;
  }
}
