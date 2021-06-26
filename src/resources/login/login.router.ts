import express, { Request, Response } from 'express';
import { getToken } from './login.service';

const loginRouter = express.Router();

loginRouter.route('/').post(async (req: Request, res: Response) => {  
  try {
    const token: string | undefined = await getToken({
      login: req.body.login,
      password: req.body.password,
     });

     if (!token) {     
      res.status(403).send('Forbidden');
     }

     res.status(200).send({token});  

  } catch {
    res.status(401).send('Bad Request'); 
  };
   
});

export default loginRouter;
