import { randomUUID } from 'crypto';
import { Column } from '../columns/column.model';

export interface IBoard {
  id?: string;
  title: string;
  columns: Column[];
}

export class Board {
  id?: string;

  title: string;
  
  columns: Column[];

    constructor({
      id = randomUUID(),
      title = 'Board TITLE',
      columns = [new Column()],
    }: IBoard) {
      this.id = id;
      this.title = title;
      this.columns = columns;
    }
  }
