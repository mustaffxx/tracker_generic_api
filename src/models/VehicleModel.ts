import { Schema, model, Document } from 'mongoose';

interface ICoordinates {
  lat: string;
  lng: string;
}

interface IVehicle extends Document {
  _id: string;
  uid: string;
  vclass: string;
  vmodel: string;
  plate: string;
  coordinates: Array<ICoordinates>;
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
    plate: {
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
    coordinates: {
      type: Array<ICoordinates>(),
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IVehicle>('Vehicle', schema);
