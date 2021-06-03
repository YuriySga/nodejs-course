import express, { Request, Response } from "express";
import * as boardsService from './board.service';

const boardRouter = express.Router({ mergeParams: true });

interface GetParams {
  [key: string]: string
  id: string
}

boardRouter.route('/').get(async (_req: Request,res: Response) => {
    const boards = await boardsService.getAll();   
    res.json(boards);
});

boardRouter.route('/:id').get<GetParams>(async (req: Request, res: Response) => {
  const board = await boardsService.get(req.params['id']!);
  if (board) {    
    res.status(200).send(board); 

  } else {
    res.status(404).send('Board not found');
  }
});

boardRouter.route('/').post(async (req: Request, res: Response) => {
  const board = await boardsService.create({
        title: req.body.title,
        columns: req.body.columns,        
  });
 
  res.status(201).send(board);
});

boardRouter.route('/:id').delete<GetParams>(async (req: Request, res: Response) => {
  boardsService.del(req.params['id']!)
    .then(status => res.sendStatus(status));
    // .then(status => res.status(status));
});

boardRouter.route('/:id').put<GetParams>(async (req: Request, res: Response) => {
  const board = await boardsService.update({
    id: req.params['id'],
    title: req.body.title,
    columns: req.body.columns,
  });

  if (board) {
    res.status(200).send(board);

   } else {     
     res.sendStatus(400).send('Bad request');
     // res.status(400).send('Bad request');
   }
});

export default boardRouter;