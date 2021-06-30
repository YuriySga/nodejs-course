import { DeleteResult } from 'typeorm';
import { IBoard } from '../../common/types';
import { Board } from '../../entities/Board';
import * as boardsRepo from './board.memory.repository';

export const getAll = async (): Promise<Board[]> => boardsRepo.getAll();
export const get = async (id: string): Promise<Board | undefined> => boardsRepo.get(id);
export const create = async (board: IBoard): Promise<IBoard | undefined> => boardsRepo.create(board);
export const update = async (board: IBoard): Promise<undefined | IBoard>  => boardsRepo.update(board);
export const del = async (id: string): Promise<DeleteResult> => boardsRepo.del(id);


 