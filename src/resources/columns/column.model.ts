import { randomUUID } from 'crypto';

export class Column {
    id: string;

    title: string;

    order: number;

    constructor({
      id = randomUUID(),
      title = 'TITLE COLUMN',
      order = 0,
    } = {}) {
      this.id = id;
      this.title = title;
      this.order = order;
    }
  }
  
