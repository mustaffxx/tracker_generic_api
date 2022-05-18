import jwt, { JwtPayload } from 'jsonwebtoken';

export interface ITokenPayload extends JwtPayload {
  user: {
    id: string;
    name: string;
    role: string;
  };
}
