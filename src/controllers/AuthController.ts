import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import User from '../models/UserModel';

class AuthController {
  async register(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const query = await User.find({ email: email });
    if (query && query.length !== 0) {
      return res.status(409).json({ error: 'Email already exists.' });
    }

    const passwordhash = bcrypt.hashSync(password, 10);

    const user = new User({
      _id: uuid(),
      name,
      email: email.toLowerCase(),
      password: passwordhash,
    });

    try {
      await user.save();

      const token: string = jwt.sign(
        { id: user._id, name: user.name, role: user.role },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: '24h',
        }
      );

      user.password = '';
      res.set('x-access-token', token);

      return res.status(201).json({ user });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const token: string = jwt.sign(
        { id: user._id, name: user.name, role: user.role },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: '24h',
        }
      );

      user.password = '';
      res.set('x-access-token', token);

      return res.status(200).json({ user });
    } catch {
      return res.status(500).json({ error: 'Token Generation Failed' });
    }
  }

  async edit(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'test ok' });
    /* todo */
  }
}

export default new AuthController();
