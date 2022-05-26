import { Schema, model, Document } from 'mongoose';

interface ICoordinates {
  lat: string;
  lng: string;
}

interface IDevice extends Document {
  _id: string;
  uid: string;
  vid: string;
  did: string;
  key: string;
  coordinates: Array<ICoordinates>;
}

const schema = new Schema(
  {
    _id: {
      type: String,
    },
    uid: {
      type: String,
      required: false,
    },
    vid: {
      type: String,
      required: false,
    },
    did: {
      type: String,
      required: true,
    },
    key: {
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

export default model<IDevice>('Device', schema);
