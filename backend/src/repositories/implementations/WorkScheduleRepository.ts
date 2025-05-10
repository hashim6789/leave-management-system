import { BaseRepository } from './BaseRepository';
import { Model } from 'mongoose';
import { IWorkScheduleRepository } from '../interfaces';
import { IWorkSchedule } from '@/models';

export class WorkScheduleRepository
  extends BaseRepository<IWorkSchedule>
  implements IWorkScheduleRepository
{
  constructor(model: Model<IWorkSchedule>) {
    super(model);
  }
}
