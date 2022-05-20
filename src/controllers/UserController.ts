import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import User from '../models/UserModel';
import Vehicle from '../models/VehicleModel';

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users = await User.find({});
    users.map((user) => {
      user.password = '';
    });
    return res.status(200).json({ users });
  }

  async updateUserById(req: Request, res: Response): Promise<Response> {
    const { id, nname, nemail, npassword, nrole } = req.body;
    if (!id || !nname || !nemail || !npassword || !nrole) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const user = await User.find({ _id: id });
    if (!user || user.length === 0) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    try {
      const passwordhash = bcrypt.hashSync(npassword, 10);
      const userUpdated = await User.findOneAndUpdate(
        { _id: id },
        {
          name: nname,
          email: nemail,
          password: passwordhash,
          role: nrole,
        },
        { returnDocument: 'after' }
      );
      if (userUpdated !== null) {
        userUpdated.password = '';
        return res.status(200).json({ userUpdated });
      } else {
        return res.status(400).json({ error: 'User does not exists' });
      }
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const user = await User.find({ _id: id });
    if (!user || user.length === 0) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    try {
      await User.deleteOne({ _id: id });
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getVehicles(req: Request, res: Response): Promise<Response> {
    const vehicles = await Vehicle.find({});

    return res.status(200).json({ vehicles });
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
