import { DailySchedule, ScheduleType } from '@/types';
import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface IWorkSchedule extends Document {
  _id: ObjectId;
  name: string;
  type: ScheduleType;
  weeklySchedule: DailySchedule[];
  startTime: string;
  endTime: string;
  requiredHours: number;
  requiresApproval: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const dailyScheduleSchema = new Schema({
  day: { type: String, required: true },
  isDayOff: { type: Boolean, default: false },
});

const workScheduleSchema = new Schema<IWorkSchedule>(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['time', 'duration'], required: true },
    weeklySchedule: [dailyScheduleSchema],
    startTime: { type: String },
    endTime: { type: String },
    requiredHours: { type: Number },
    requiresApproval: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

export const WorkScheduleModel = mongoose.model<IWorkSchedule>('WorkSchedule', workScheduleSchema);
