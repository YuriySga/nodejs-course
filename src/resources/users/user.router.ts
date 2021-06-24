import express, { NextFunction, Request, Response/* , NextFunction  */} from "express";
import { IUser } from "../../common/types";
import * as usersService from './user.service';

const userRouter = express.Router();

userRouter.route('/').get(async (_req: Request, res: Response, next: NextFunction) => {
  const users = await usersService.getAll();
   res.json(users);
   next();
});

userRouter.route('/:id').get(async (req: Request, res: Response) => {
  const user: IUser | undefined = await usersService.get(req.params['id']!);
  if (user) { 
    res.json(user);

  } else {    
    res.status(404).send('User not found');
  }
});

userRouter.route('/').post(async (req: Request, res: Response) => {
  const user = await usersService.create(
    {      
      name: req.body.name,
      login: req.body.login,
      password: req.body.password,
    }
  );

  res.status(201).send(user);
});

userRouter.route('/:id').put(async (req: Request, res: Response) => {
  try {
    const user = await usersService.update({
        id: req.params['id'],
        login: req.body.login,
        password: req.body.password,
        name: req.body.name,
    });

    if (user) {
      res.status(200).send(user);

    } else {
      res.status(400).send('Bad request');
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

userRouter.route('/:id').delete(async (req: Request, res: Response) => {  
  const result = await usersService.del(req.params['id']!);
  if ( result.affected && result.affected > 0 ) {    
    console.log('200---------------del------------------------');
    console.log('200---------------del------------------------');
    console.log('200---------------del------------------------');
    console.log('200---------------del------------------------');
    console.log('200---------------del------------------------');
    res.sendStatus(200);    
  } else {

  console.log('404---------------del------------------------');
  console.log('404---------------del------------------------');
  console.log('404---------------del------------------------');
  console.log('404---------------del------------------------');
  console.log('404---------------del------------------------');
  console.log('404---------------del------------------------');
  res.sendStatus(404);
  }
}); 

export default userRouter;