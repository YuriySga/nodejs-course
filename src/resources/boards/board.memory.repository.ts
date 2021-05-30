import { Column } from "../columns/column.model";
import { Board, IBoard } from './board.model';
import * as taskService from '../tasks/task.service';
import {boardDB} from '../../common/inMemoryDb';


export const getAll = async (): Promise<Board[]> => boardDB;

export const get = async (id: string): Promise<Board | undefined> => boardDB.find(board=>board.id === id);

export const create = async (board: IBoard): Promise<Board | undefined> => {
  const newBoard = new Board(
    {
      ...board, columns: board.columns.map(item => new Column(item))
    }
  );

  boardDB.push(newBoard);
  return get(newBoard.id!);
}

export const del = async (id: string): Promise<number>=> {
  const boardIndex = boardDB.findIndex(board => board.id === id);
  if (boardIndex !== -1) {
    const deletedBoard = boardDB.splice(boardIndex, 1);
    const boardTasks = await taskService.getAll(deletedBoard[0]!.id!);

    if (boardTasks) {
      boardTasks.map(task=>taskService.del(task.id));
    }

    return 204;
  }

  return 404;  
};

export const update = async (board: Board): Promise<any> => del(board.id!)
  .then(status => {
    if (status === 404) {
      return undefined;
    }  

    return create(board);
  });
