import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import Device from '../models/DeviceModel';

class DeviceController {
  async createDevice(req: Request, res: Response): Promise<Response> {
    const { key, dname } = req.body;
    if (!key) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const device = await Device.find({ key });
    if (device.length !== 0) {
      return res.status(409).json({ error: 'Device already exists' });
    }

    const newDevice = new Device({
      _id: uuid(),
      dname: dname,
      key: key,
    });

    try {
      await newDevice.save();
      return res.status(200).json({ newDevice });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getDevice(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const device = await Device.findOne({ _id: id });

    return res.status(200).json({ device });
  }

  async updateDevice(req: Request, res: Response): Promise<Response> {
    const { _id, uid, vid, dname } = req.body;
    if (!_id) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const device = await Device.findOne({ _id });
    if (device === null) {
      return res.status(404).json({ error: 'Device does not exists' });
    }

    try {
      const updatedDevice = await Device.findOneAndUpdate(
        { _id },
        {
          uid: uid,
          vid: vid,
          dname: dname,
        },
        { returnDocument: 'after' }
      );
      if (updatedDevice) {
        return res.status(200).json({ updatedDevice });
      } else {
        return res.status(404).json({ error: 'Device does not exists' });
      }
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteDevice(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const device = await Device.find({ _id: id });
    if (device.length === 0) {
      return res.status(409).json({ error: 'Device does not exists' });
    }

    try {
      const deviceDeleted = await Device.deleteOne({ _id: id });
      if (deviceDeleted.deletedCount > 0) {
        return res.status(200).json({ message: 'Device deleted successfully' });
      } else {
        return res.status(404).json({ error: 'Device does not exists' });
      }
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new DeviceController();
