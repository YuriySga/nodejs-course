import express, { Request, Response } from "express";
import * as tasksService from './task.service';

const taskRouter = express.Router({ mergeParams: true });

interface GetParams {
  [key: string]: string
  id: string
}

taskRouter.route('/').get<GetParams>(async (req: Request, res: Response) => {
  const tasks = await tasksService.getAll(req.params['boardId']!);
  res.json(tasks);
});

taskRouter.route('/:id').get(async (req: Request, res: Response) => {
  const task = await tasksService.get(req.params['id']!);
  if (task) {
    res.json(task);
  } else {
    res.sendStatus(404);
    // res.status(404);
  }  
});

taskRouter.route('/').post(async (req: Request, res: Response) => {
  const task = await tasksService.create(
    {      
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params['boardId']!,
      columnId: req.body.columnId,
    }
  );

  res.status(201).send(task);
});

taskRouter.route('/:id').delete(async (req: Request, res: Response) => {
  tasksService.del(req.params['id']!)
    .then(status => res.sendStatus(status));
    // .then(status => res.status(status));
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
    // res.status(400);
   }
});

export default taskRouter;

