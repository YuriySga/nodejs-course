import express, { Request, Response } from 'express';

const loginRouter = express.Router();

loginRouter.route('/').get(async (_req: Request, res: Response) => {
    // const users = await usersService.getAll();
    res.status(201).send('login');
     
  });

export default loginRouter;
