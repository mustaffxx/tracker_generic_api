import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
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
  },
  {
    _id: false,
    timestamps: true,
  }
);

export default model<IUser>('User', schema);
