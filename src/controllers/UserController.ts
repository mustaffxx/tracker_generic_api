import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const response = await UserService.create(req, res);
    return response;
  }
}

export default new UserController();
