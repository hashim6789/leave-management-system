import { Document, model, Schema } from 'mongoose';

import { ObjectId } from 'mongoose';

export interface IGroup extends Document {
  _id: ObjectId;
  name: string;
  description: string;
  isListed: boolean;
  workSchedule: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const groupSchema = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    description: { type: String },
    isListed: { type: Boolean, default: true },
    workSchedule: { type: Schema.Types.ObjectId, ref: 'WorkSchedule', required: true },
  },
  {
    timestamps: true,
  },
);

export const GroupModel = model<IGroup>('Groups', groupSchema);
