import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import Device from '../models/DeviceModel';

class DeviceController {
  async createDevice(req: Request, res: Response): Promise<Response> {
    const { key, dname } = req.body;
    if (!key) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const device = Device.findOne({ key });
    if (device !== null) {
      return res.status(409).json({ error: 'Device already exists' });
    }

    const newDevice = new Device({
      _id: uuid(),
      dname: dname,
      key: key,
    });

    try {
      await newDevice.save();
      newDevice.key = '';
      return res.status(200).json({ newDevice });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
