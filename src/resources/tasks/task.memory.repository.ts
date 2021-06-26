import { DeleteResult, getRepository } from "typeorm";
import { ITask, ITaskIds } from "../../common/types";
import { BoardTask } from "../../entities/BoardTask";

export const getAll = async (boardId: string): Promise<BoardTask[]> => {
  const taskRepository = getRepository(BoardTask);
  const tasks = await taskRepository.find({where: {boardId: `${boardId}`}});
  return tasks;
}

export const get = async (ids: ITaskIds): Promise<BoardTask | undefined> => {
  const taskRepository = getRepository(BoardTask);
  const tasks = await taskRepository.findOne({where: {boardId: `${ids.boardId}`, id: `${ids.taskId}`}});
  return tasks;
};

export const create = async (task: ITask): Promise<BoardTask | undefined>  => {
  const taskRepository = getRepository(BoardTask);
  const newBoard = taskRepository.create(task);
  const results = await taskRepository.save(newBoard);
  return taskRepository.findOne(results.id);
};

export const update = async (taskData: ITask): Promise<undefined | BoardTask> => {
  const taskRepository = getRepository(BoardTask);
  const oldTask = await taskRepository.findOne(taskData.id);  
  if (oldTask) {
    taskRepository.merge(oldTask, taskData);
    const results = await taskRepository.save(oldTask);
    return results;
  }

  return undefined;
};

export const del = async (id: string): Promise<DeleteResult> => {
  const taskRepository = getRepository(BoardTask);
  const result = await taskRepository.delete(id);
  return result;
};

export const clearTaskUser = async (userId: string): Promise<void> => {
  const taskRepository = getRepository(BoardTask);
  const usersTasks = await taskRepository.find({where: {userId: `${userId}`}});
  usersTasks.map(async task => {
    taskRepository.merge(task, {userId: null});
    await taskRepository.save(task);
  });
};





export const clearTaskBoard = async (boardId: string): Promise<void> => {
  const taskRepository = getRepository(BoardTask);
  await taskRepository.delete({boardId: `${boardId}`});
};


