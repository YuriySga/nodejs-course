import express, { Request, Response } from "express";
import { ITaskIds } from "../../common/types";
import * as tasksService from './task.service';

const taskRouter = express.Router({ mergeParams: true });

taskRouter.route('/').get(async (req: Request, res: Response) => {
  const tasks = await tasksService.getAll(req.params['boardId']!);
  res.json(tasks);
});

taskRouter.route('/:id').get(async (req: Request, res: Response) => {
  const ids: ITaskIds = {
    taskId: req.params['id'],
    boardId: req.params['boardId']
  };

  const task = await tasksService.get(ids);
  if (task) {
    res.json(task);
  } else {
    res.sendStatus(404);
  }  
});

taskRouter.route('/').post(async (req: Request, res: Response) => {
  try {
    const task = await tasksService.create({      
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params['boardId']!,
        columnId: req.body.columnId,
    });

    res.status(201).send(task);
  } catch(err) {
    console.log(err.msg);
    res.status(400);
  };

});

taskRouter.route('/:id').put(async (req: Request, res: Response) => {
  const task = await tasksService.update(
    { 
      id: req.params['id']!,
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params['boardId']!,
      columnId: req.body.columnId,
    }
  );

  if (task) {    
    res.status(200).send(task);

   } else {
     res.sendStatus(400);
   }
});

taskRouter.route('/:id').delete(async (req: Request, res: Response) => {
  const result = await tasksService.del(req.params['id']!);
  if ( result.affected && result.affected > 0 ) {    
    res.sendStatus(200);
    return;
  }  

  res.sendStatus(404)  
});

export default taskRouter;

