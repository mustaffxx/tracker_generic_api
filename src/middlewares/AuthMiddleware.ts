import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class AuthMiddleware {
  async validateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.TOKEN_KEY as string
      );
      console.log(decoded);
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return next();
  }
}

export default new AuthMiddleware();
