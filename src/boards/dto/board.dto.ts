import { Board } from '../entities/board.entity';

export class BoardDto extends Board {
  id!: string;
  title!: string;
  columns!: string | null;
}
