import { Document, model, ObjectId, Schema } from 'mongoose';

export interface IAttendance extends Document {
  _id: ObjectId;
  user: ObjectId;
  group: ObjectId;
  workSchedule: ObjectId;
  checkInTime: Date;
  checkOutTime: Date;
  status: 'checked-in' | 'checked-out';
  approvalStatus: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
const attendanceSchema = new Schema<IAttendance>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    workSchedule: { type: Schema.Types.ObjectId, ref: 'WorkSchedule', required: true },
    checkInTime: { type: Date, required: true },
    checkOutTime: { type: Date },
    status: { type: String, enum: ['checked-in', 'checked-out'], required: true },
    approvalStatus: { type: String, enum: ['pending', 'rejected', 'approved'] },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export const AttendanceModel = model<IAttendance>('Attendance', attendanceSchema);
