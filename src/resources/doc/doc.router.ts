import express, { Request, Response } from 'express';

const docRouter = express.Router();

docRouter.route('/').get(async (_req: Request, res: Response) => {
    // const users = await usersService.getAll();
    res.status(201).send('doc');
     
  });

export default docRouter;