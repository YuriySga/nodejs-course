import express, { Request, Response } from "express";
import * as boardsService from './board.service';

const boardRouter = express.Router({ mergeParams: true });

boardRouter.route('/').get(async (_req: Request,res: Response) => {
    const boards = await boardsService.getAll();   
    res.json(boards);
});

boardRouter.route('/:id').get(async (req: Request, res: Response) => {
  const board = await boardsService.get(req.params['id']!);
  if (board) {    
    res.status(200).send(board); 

  } else {
    res.status(404).send('Board not found');
  }
});

boardRouter.route('/').post(async (req: Request, res: Response) => {
  try {
    const board = await boardsService.create({
      title: req.body.title,
      columns: req.body.columns
    });
  
    res.status(201).send(board);
  } catch(err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

boardRouter.route('/:id').put(async (req: Request, res: Response) => {
  const board = await boardsService.update({
    id: req.params['id'],
    title: req.body.title    
  });

  if (board) {
    res.status(200).send(board);

   } else {     
     res.sendStatus(400).send('Bad request');
   }
});

boardRouter.route('/:id').delete(async (req: Request, res: Response) => {
  const result = await boardsService.del(req.params['id']!);
  if ( result.affected && result.affected > 0 ) {    
    res.sendStatus(200);
    return
  }  

  res.sendStatus(404)  
});

export default boardRouter;