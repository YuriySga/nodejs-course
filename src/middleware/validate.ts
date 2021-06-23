/* import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

const tokenKey = '1a2b-3c4d-5e6f-7g8h'

export const logger = (req: Request, res: Response, next: NextFunction): void => {
    const sessionToken = req.headers.authorization;
    console.log(sessionToken);
    if (!sessionToken) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    } 
        jwt .verify(sessionToken, 'lets_play_sum_games_man', (err, decoded) => {
            if (decoded) {
                User.findOne({ where: { id: decoded.id } }).then(user => {
                    req.user = user;
                    console.log(`user: ${user}`)
                    next()
                },
                    () => {
                        res.status(401).send({ error: "not authorized" });
                    })

            } else {
                res.status(400).send({ error: "not authorized" })
            }
        });
    
}; */