/* eslint-disable @typescript-eslint/no-empty-function */
import * as fs from 'fs';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req, res] = context.getArgs();
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const data = `Time: ${hour}:${minutes}:${seconds}\n     Method: ${
      req.method
    }\n     Url: ${req.url}\n     fullUrl: ${req.protocol}://${req.get(
      'host'
    )}${req.originalUrl}\n     Request params: ${JSON.stringify(
      req.params
    )}\n     Request body: ${JSON.stringify(
      req.body
    )}\n     Request query: ${JSON.stringify(
      req.query
    )}\n     Responded with status ${res.statusCode}\n     Agent: ${req.get(
      'user-agent'
    )}`;

    fs.appendFile('./logs/server.log', `${data}\n`, () => {});

    return next.handle();
  }
}
