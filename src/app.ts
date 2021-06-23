import jwt from 'jsonwebtoken';
import express, { Errback, NextFunction, Request, Response } from "express";
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import boardRouter from "./resources/boards/board.router";
import taskRouter from './resources/tasks/task.router';
import userRouter from './resources/users/user.router'; 
import { logger,loggerUnhandledRejection, uncaughtException} from "./common/logger";
import loginRouter from "./resources/login/login.router";
import { User } from './entities/User';
import docRouter from './resources/doc/doc.router';

const tokenKey = '1a2b-3c4d-5e6f-7g8h'

/* interface IReqParams {
  originalUrl: string,
  user: string
}

interface IPayload {
  id: string
} */

export const app = express();
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

// eslint-disable-next-line consistent-return
app.use((req: any, res: Response, next: NextFunction): any => {
  const sessionToken = req.headers.authorization;
  if (!sessionToken) return res.status(401).send({ auth: false, message: "No token provided." });
  
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
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use((_err: Errback, _req: Request, res: Response, next: NextFunction): void => {
  res.status(500);
  next();
 
});

process.on('uncaughtException', uncaughtException);

process.on('unhandledRejection', loggerUnhandledRejection);