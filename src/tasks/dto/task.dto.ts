import { Task } from '../entities/task.entity';

export class TaskDto extends Task {
  boardId!: string;
  columnId!: string | null;
  userId!: string | null;
  description!: string;
  title!: string;
  order!: number;
}
