import { Task } from '../entities/task.entity';

export class CreateTaskDto extends Task {
  boardId!: string;
  columnId!: string | null;
  userId!: string | null;
  description!: string;
  title!: string;
  order!: number;
}
