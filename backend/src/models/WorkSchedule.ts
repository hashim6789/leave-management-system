import mongoose, { Document, Schema } from 'mongoose';
import { IWorkSchedule } from '../types/workSchedule';

interface WorkScheduleDocument extends IWorkSchedule, Document {}

const dailyScheduleSchema = new Schema({
  day: { type: String, required: true },
  isDayOff: { type: Boolean, default: false },
  startTime: { type: String },
  endTime: { type: String },
  duration: { type: Number },
});

const workScheduleSchema = new Schema<WorkScheduleDocument>({
  name: { type: String, required: true },
  type: { type: String, enum: ['time', 'duration'], required: true },
  weeklySchedule: [dailyScheduleSchema],
  createdAt: { type: Date, default: Date.now },
});

export const WorkSchedule = mongoose.model<WorkScheduleDocument>(
  'WorkSchedule',
  workScheduleSchema,
);
