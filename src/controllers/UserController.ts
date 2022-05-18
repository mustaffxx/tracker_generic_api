import { Request, Response } from 'express';
import Vehicle from '../models/VehicleModel';

class UserController {
  async getVehicles(req: Request, res: Response): Promise<Response> {
    const { id, name, role } = res.locals;

    const vehicles = await Vehicle.findOne({ uid: id });

    return res.status(200).json({ vehicles });
  }
}

export default new UserController();
