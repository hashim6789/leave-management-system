import { Document, model, Schema } from 'mongoose';

import { ObjectId } from 'mongoose';

export interface IGroup extends Document {
  _id: ObjectId;
  name: string;
  description: string;
  isListed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const groupSchema = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    description: { type: String },
    isListed: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const GroupModel = model<IGroup>('Groups', groupSchema);
