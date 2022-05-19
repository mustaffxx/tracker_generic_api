import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
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

  async getUserVehicles(req: Request, res: Response): Promise<Response> {
    const { id } = res.locals;

    const vehicles = await Vehicle.findOne({ uid: id });

    return res.status(200).json({ vehicles });
  }

  async createVehicle(req: Request, res: Response): Promise<Response> {
    const { uid, plate, vclass, vmodel } = req.body;
    if (!uid || !plate || !vclass || !vmodel) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const user = await User.find({ _id: uid });
    if (!user || user.length === 0) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const vehicle = await Vehicle.find({ plate });
    if (vehicle && vehicle.length !== 0) {
      return res.status(409).json({ error: 'Vehicle already exists' });
    }

    try {
      const vehi = new Vehicle({
        _id: uuid(),
        uid,
        plate,
        vclass,
        vmodel,
        coordinates: [],
      });
      await vehi.save();
      return res.status(200).json({ vehi });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();
