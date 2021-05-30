import { taskDB } from '../../common/inMemoryDb';
import { ITask, Task } from './task.model';

export const getAll = async (boardId: string): Promise<Task[]> => taskDB.filter(task => task.boardId === boardId);
export const get = async (id: string): Promise<Task | undefined> => taskDB.find(task => task.id === id);
export const create = async (task: ITask): Promise<Task | undefined>  => {
  const newTask = new Task(task);
  taskDB.push(newTask);
  return get(newTask.id);
};

export const del = async (id: string): Promise<number> => {
  const taskIndex = taskDB.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    taskDB.splice(taskIndex, 1);
    return 204;
  }

  return 404;  
};

export const update = async (taskData: ITask): Promise<undefined | Task> => 
   del(taskData.id!)
    .then(status => {    
      if (status === 204) {
        return create(new Task(taskData));
      } 

      return undefined;
    });

export const clearTaskUser = async (userId: string): Promise<void> => {
  const userTasks = taskDB.filter(task => task.userId === userId);
  userTasks.map(task => update({...task, userId: null}));
};