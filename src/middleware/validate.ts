import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IValideteRequest } from '../common/types';
import { User } from '../entities/User';

export const validate = (expressRequest: Request, res: Response, next: NextFunction): void => {
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

};