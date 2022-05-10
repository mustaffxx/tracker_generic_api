import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import User from '../models/UserModel';

class UserService {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Bad request.' });
    }

    const query = await User.find({ email: email });
    if (query && query.length !== 0) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    const user = new User({
      _id: uuid(),
      name,
      email,
      password,
    });

    try {
      await user.save();
      user.password = '';
      return res.status(201).json({ user });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new UserService();
