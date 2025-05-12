import { BaseRepository } from './BaseRepository';
import { Model } from 'mongoose';
import { IAttendanceRepository } from '../interfaces';
import { IAttendance } from '@/models';

export class AttendanceRepository
  extends BaseRepository<IAttendance>
  implements IAttendanceRepository
{
  constructor(model: Model<IAttendance>) {
    super(model);
  }
}
