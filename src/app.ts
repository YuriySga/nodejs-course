import express, { NextFunction, Request, Response } from "express";
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import boardRouter from "./resources/boards/board.router";
import taskRouter from './resources/tasks/task.router';
import userRouter from './resources/users/user.router'; 
import { logger } from "./common/logger";

interface IReqParams {
  originalUrl: string
}

export const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

/* app.use((_req, res, next) => {
  res.on('finish', () => {
    console.log(`Responded with status ${res.statusCode}`);
  });
  next();
}); */

app.use('/', logger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request<IReqParams>, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((_err: any, _req: any, res: any, _next: any) => {
  res.sendStatus(500);
});

process.on('uncaughtException', (err) => {
  console.error(`${(new Date).toUTCString()  } uncaughtException:`, err.message)
  console.error(err.stack)
  process.exit(1)
})
