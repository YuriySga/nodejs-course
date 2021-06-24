import express, { Application, Errback, NextFunction, Request, Response } from "express";
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import boardRouter from "./resources/boards/board.router";
import taskRouter from './resources/tasks/task.router';
import userRouter from './resources/users/user.router'; 
import { logger,loggerUnhandledRejection, uncaughtException} from "./common/logger";
import loginRouter from "./resources/login/login.router";
import docRouter from './resources/doc/doc.router';
import { validate } from "./middleware/validate";
// import {validate} from './middleware/validate';

export const app: Application = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/', logger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!!!');
    return;
  }
  next();
});


app.use('/login', loginRouter);
app.use('/doc', docRouter);

app.use(validate);

/* app.use('/', (expressRequest: Request, res: Response, next: NextFunction): void => {
  const tokenKey = '1a2b-3c4d-5e6f-7g8h';
  const req = expressRequest as IValideteRequest;
  const sessionToken = req.headers.authorization;
  if (!sessionToken) {
      res.status(401).send({ auth: false, message: "No token provided." });  

  } else {      
    jwt.verify(sessionToken, tokenKey, (err: jwt.VerifyErrors | null, payload: any) => {
      if (err) next();
      else if (payload) {
        User.findOne({ where: { id: payload.id } })
          .then(user => {
            req.user = user;
            console.log(`user: ${user}`)
            next();
          },
          () => {
            res.status(401).send({ error: "not authorized" });
        });
      } else {
        res.status(401).send({ error: "not authorized" })
      };        
    });      
  } 
}
) */

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use((_err: Errback, _req: Request, res: Response, next: NextFunction): void => {
  res.status(500);
  next();
 
});

process.on('uncaughtException', uncaughtException);

process.on('unhandledRejection', loggerUnhandledRejection);