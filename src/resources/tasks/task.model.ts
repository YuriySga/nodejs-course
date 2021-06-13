import { randomUUID } from 'crypto';

export interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId : string;
}

export class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId : string;

  constructor({
    id = randomUUID(),
    title = 'TASK TITLE',
    order = 0,
    description = 'task description',
    userId = 'id-userId-id',
    boardId = 'id-boardId-id',
    columnId = 'id-columnId-id',
  }: ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
