import { Request, Response, NextFunction } from 'express';
import roles from '../helpers/roles';

class UserMiddleware {
  async validateAdminRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const role = res.locals.role;
    if (!role || role != roles.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return next();
  }
}

export default new UserMiddleware();
