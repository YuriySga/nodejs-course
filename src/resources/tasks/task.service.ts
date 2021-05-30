import { ITask, Task } from './task.model';
import * as taskRepo from './task.memory.repository';

export const getAll = async (boardId: string): Promise<Task[]> => taskRepo.getAll(boardId);
export const get = async (id: string): Promise<Task | undefined> => taskRepo.get(id);
export const create = async (task: ITask): Promise<Task | undefined> => taskRepo.create(task);
export const del = async (id: string): Promise<number> => taskRepo.del(id);
export const update = async (taskData: ITask): Promise<any> => taskRepo.update(taskData);
export const clearTaskUser = async (userId: string): Promise<void> => taskRepo.clearTaskUser(userId);
