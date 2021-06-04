import * as fs from 'fs'
import { Request ,Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const data = `Time: ${hour}:${minutes}:${seconds}\n     Method: ${req.method}\n     Url: ${req.url}\n     fullUrl: ${req.protocol}://${req.get('host')}${req.originalUrl}\n     Request params: ${JSON.stringify(req.params)}\n     Request body: ${JSON.stringify(req.body)}\n     Request query: ${JSON.stringify(req.query)}\n     Responded with status ${res.statusCode}\n     Agent: ${req.get("user-agent")}`;
      fs.appendFile("server.log", `${data  }\n`, () => {});
  });
  
  next();
};

export const loggerUnhandledRejection = (reason: any) => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const data = `Time: ${hour}:${minutes}:${seconds}\n     unhandledRejection:\n     reason: ${reason}\n`;
  fs.appendFile("server.log", `${data  }\n`, () => {});
};

export const uncaughtException = (err: any) =>  {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const data = `Time: ${hour}:${minutes}:${seconds}\n      uncaughtException:\n     err: ${err}\n     err stack: ${err.stack}`;
  fs.appendFile("server.log", `${data  }\n`, () => {});
};

