import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import User from '../models/UserModel';
import Vehicle from '../models/VehicleModel';
import Device from '../models/DeviceModel';

class VehicleController {
  /* Admin role */
  async getAllVehicles(req: Request, res: Response): Promise<Response> {
    const vehicles = await Vehicle.find({});

    return res.status(200).json({ vehicles });
  }
  /* Admin role */
  async getVehiclesByUserId(req: Request, res: Response): Promise<Response> {
    const uid = req.params.uid;

    const vehicles = await Vehicle.find({ uid });

    return res.status(200).json({ vehicles });
  }

  async createVehicle(req: Request, res: Response): Promise<Response> {
    const { id: uid } = res.locals;
    const { did, vclass, vmodel, plate } = req.body;
    if (!uid || !did || !vclass || !vmodel || !plate) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const user = await User.find({ _id: uid });
    if (!user || user.length === 0) {
      return res.status(404).json({ error: 'User does not exists' });
    }

    const vehicle = await Vehicle.find({ plate });
    if (vehicle && vehicle.length !== 0) {
      return res.status(409).json({ error: 'Vehicle already exists' });
    }

    const device = await Device.find({ _id: did });
    if (device.length === 0) {
      return res.status(404).json({ error: 'Device does not exists' });
    }

    device.map((dev) => {
      if (dev.uid !== '' || dev.vid !== '') {
        return res.status(409).json({ error: 'Device already registered' });
      }
    });

    try {
      const newVehicle = new Vehicle({
        _id: uuid(),
        uid,
        did,
        vclass,
        vmodel,
        plate,
      });

      await Device.updateOne(
        { _id: did },
        {
          uid: uid,
          vid: newVehicle._id,
        }
      );

      await newVehicle.save();
      return res.status(200).json({ newVehicle });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getVehicles(req: Request, res: Response): Promise<Response> {
    const { id } = res.locals;

    const vehicles = await Vehicle.findOne({ uid: id });

    return res.status(200).json({ vehicles });
  }

  async updateVehicleById(req: Request, res: Response): Promise<Response> {
    const { id } = res.locals;
    const { vid, plate, vclass, vmodel } = req.body;
    if (!vid || !plate || !vclass || !vmodel) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    try {
      const updatedVehicle = await Vehicle.findOneAndUpdate(
        { _id: vid, uid: id },
        {
          plate: plate,
          vclass: vclass,
          vmodel: vmodel,
        },
        { returnDocument: 'after' }
      );
      if (updatedVehicle) {
        return res.status(200).json({ updatedVehicle });
      } else {
        return res.status(404).json({ error: 'Vehicle does not exists' });
      }
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteVehicleById(req: Request, res: Response): Promise<Response> {
    const { id } = res.locals;
    const { vid } = req.body;
    if (!vid) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    try {
      const deletedVehicle = await Vehicle.deleteOne({ _id: vid, uid: id });
      if (deletedVehicle) {
        return res
          .status(200)
          .json({ message: 'Vehicle deleted successfully' });
      } else {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new VehicleController();
