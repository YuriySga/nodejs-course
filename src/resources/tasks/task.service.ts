import { DeleteResult } from 'typeorm';
import { ITask, ITaskIds } from '../../common/types';
import { BoardTask } from '../../entities/BoardTask';
import * as taskRepo from './task.memory.repository';

export const getAll = async (boardId: string): Promise<BoardTask[]> => taskRepo.getAll(boardId);
export const get = async (ids: ITaskIds): Promise<BoardTask | undefined> => taskRepo.get(ids);
export const create = async (task: ITask): Promise<BoardTask | undefined> => taskRepo.create(task);
export const update = async (taskData: ITask): Promise<undefined | BoardTask> => taskRepo.update(taskData);
export const del = async (id: string): Promise<DeleteResult> => taskRepo.del(id);
export const clearTaskUser = async (userId: string): Promise<void> => taskRepo.clearTaskUser(userId);
export const clearTaskBoard = async (boardId: string): Promise<void> => taskRepo.clearTaskBoard(boardId);

