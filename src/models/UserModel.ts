import { Schema, model, Document } from 'mongoose';
import roles from '../helpers/roles';

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

const schema = new Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: roles.user,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

export default model<IUser>('User', schema);
