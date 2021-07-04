import { Board } from '../entities/board.entity';

export class CreateBoardDto extends Board {
  title: string;
  columns: string | null;
}
