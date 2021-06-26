import { NextFunction, Request, Response } from 'express';
import jwt, {  } from 'jsonwebtoken';
import { IValideteRequest } from '../common/types';


export const validate = async (expressRequest: Request, res: Response, next: NextFunction): Promise<void> => {
  const tokenKey: string = process.env['JWT_SECRET_KEY'] as string;  
  const req = expressRequest as IValideteRequest;
  const {authorization} = req.headers;

  if (authorization) {
    const sessionToken: string | undefined = authorization.split(' ')[1];

    if (!sessionToken) {
      res.status(401).send({ auth: false, message: "No token provided." }); 
      return;
    }

    jwt.verify(sessionToken, tokenKey, (err: jwt.VerifyErrors | null) => {

      if (err) {
        console.log('err');
        res.status(401).send({ auth: false, message: "No token provided." });  
        return;
      };

      next();
    });
  } else {
    res.status(401).send({ auth: false, message: "No token provided." });
  };
};


     