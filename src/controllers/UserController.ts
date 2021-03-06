import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/UserModel';

class UserController {
  async getUsers(req: Request, res: Response): Promise<Response> {
    const users = await User.find({});
    users.map((user) => {
      user.password = '';
    });
    return res.status(200).json({ users });
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const _id = req.params.id;

    const users = await User.find({ _id });
    users.map((user) => {
      user.password = '';
    });
    return res.status(200).json({ users });
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const { id, nname, nemail, npassword, nrole } = req.body;
    if (!id || !nname || !nemail || !npassword || !nrole) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const user = await User.find({ _id: id });
    if (!user || user.length === 0) {
      return res.status(404).json({ error: 'User does not exists' });
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
        return res.status(404).json({ error: 'User does not exists' });
      }
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const user = await User.find({ _id: id });
    if (!user || user.length === 0) {
      return res.status(404).json({ error: 'User does not exists' });
    }

    try {
      await User.deleteOne({ _id: id });
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();
