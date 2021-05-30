import express, { Request ,Response } from "express";
import { User } from './user.model';

import * as usersService from './user.service';

const userRouter = express.Router();

interface GetParams {
  [key: string]: string
  id: string
}

userRouter.route('/').get(async (_req: Request, res: Response) => {
  const users = await usersService.getAll();
   res.json(users.map(User.toResponse));
});

userRouter.route('/:id').get<GetParams>(async (req: Request, res: Response) => {
  const user = await usersService.get(req.params['id']!);
 if (user) { 
    res.json(User.toResponse(user));

  } else {
    res.sendStatus(404).send('User not found');
  } 
});

userRouter.route('/').post(async (req: Request, res: Response) => {
  const user = await usersService.create(
    {      
      login: req.body.login,
      password: req.body.password,
      name: req.body.name,
    }
  );

  res.status(201).send(User.toResponse(user!));
});

userRouter.route('/:id').put(async (req: Request, res: Response) => {
  const user = await usersService.update(
    {
      id: req.params['id'],
      login: req.body.login,
      password: req.body.password,
      name: req.body.name,
    }
  );

  if (user) {    
    res.status(200).send(User.toResponse(user));

   } else {
     res.status(400).send('Bad request');
   }
});

userRouter.route('/:id').delete<GetParams>(async (req: Request, res: Response) => {
  usersService.del(req.params['id']!)
    .then((status: number) => res.sendStatus(status));
});

export default userRouter;