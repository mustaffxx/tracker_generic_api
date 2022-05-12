import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import User from '../models/UserModel';
import { tokenToString } from 'typescript';

class AuthController {
  async register(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Bad Request Error' });
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
      user.password = '';

      const token: string = jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: '24h',
        }
      );

      return res.status(201).json({ user, token });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Bad Request Error' });
    }

    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token: string = jwt.sign(
      { user_id: user._id },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: '24h',
      }
    );

    user.password = '';
    return res.status(200).json({ user, token });
  }
}

export default new AuthController();
