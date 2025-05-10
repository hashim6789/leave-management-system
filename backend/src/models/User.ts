import { Role } from '@/types';
import { Document, model, Schema } from 'mongoose';

import { ObjectId } from 'mongoose';

export interface IUser extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  isBlocked: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    isBlocked: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['admin', 'manager', 'employee'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<IUser>('Users', userSchema);
