import { Schema, model, Document } from 'mongoose';

interface IVehicle extends Document {
  _id: string;
  uid: string;
  did: string;
  vclass: string;
  vmodel: string;
  plate: string;
}

const schema = new Schema(
  {
    _id: {
      type: String,
    },
    uid: {
      type: String,
      required: true,
    },
    did: {
      type: String,
      required: true,
    },
    vclass: {
      type: String,
      required: true,
    },
    vmodel: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IVehicle>('Vehicle', schema);
