import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ITokenPayload } from '../helpers/token';
import 'dotenv/config';

class AuthMiddleware {
  async validateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.TOKEN_KEY as string
      ) as ITokenPayload;

      res.locals.id = decoded.id;
      res.locals.name = decoded.name;
      res.locals.role = decoded.role;
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return next();
  }
}

export default new AuthMiddleware();
