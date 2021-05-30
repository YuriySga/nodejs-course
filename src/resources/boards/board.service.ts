import { Board, IBoard } from './board.model';
import * as boardsRepo from './board.memory.repository';

export const getAll = async (): Promise<Board[]> => boardsRepo.getAll();
export const create = async (board: IBoard): Promise<Board | undefined> => boardsRepo.create(board);
export const get = async (id: string): Promise<Board | undefined> => boardsRepo.get(id);
export const del = async (id: string): Promise<number> => boardsRepo.del(id);
export const update = async (board: Board): Promise<undefined | Board>  => boardsRepo.update(board);
