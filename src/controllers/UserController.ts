import { Request, Response } from 'express';
import User from '../models/UserModel';
import Vehicle from '../models/VehicleModel';

class UserController {
  async getUsers(req: Request, res: Response): Promise<Response> {
    const users = await User.find({});
    users.map((user) => {
      user.password = '';
    });
    return res.status(200).json({ users });
  }

  async getVehicles(req: Request, res: Response): Promise<Response> {
    const { id, name, role } = res.locals;

    const vehicles = await Vehicle.findOne({ uid: id });

    return res.status(200).json({ vehicles });
  }
}

export default new UserController();
