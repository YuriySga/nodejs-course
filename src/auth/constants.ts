import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConstants = {
  secret: String(process.env.JWT_SECRET_KEY),
};
