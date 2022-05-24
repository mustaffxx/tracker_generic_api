import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import User from '../models/UserModel';
import Vehicle from '../models/VehicleModel';

class VehicleController {
  async getUserVehicles(req: Request, res: Response): Promise<Response> {
    const { id } = res.locals;

    const vehicles = await Vehicle.findOne({ uid: id });

    return res.status(200).json({ vehicles });
  }

  async getAllVehicles(req: Request, res: Response): Promise<Response> {
    const vehicles = await Vehicle.find({});

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

  async updateVehicleById(req: Request, res: Response): Promise<Response> {
    const { _id, uid, plate, vclass, vmodel } = req.body;
    if (!_id || !uid || !plate || !vclass || !vmodel) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const vehicle = await Vehicle.find({ _id });
    if (!vehicle || vehicle.length === 0) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    try {
      const vehicleUpdated = await Vehicle.findOneAndUpdate(
        { _id: _id },
        {
          uid,
          plate,
          vclass,
          vmodel,
        },
        { returnDocument: 'after' }
      );

      if (vehicleUpdated !== null) {
        return res.status(200).json({ vehicleUpdated });
      } else {
        return res.status(400).json({ error: 'User does not exists' });
      }
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new VehicleController();
