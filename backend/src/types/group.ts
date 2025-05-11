import { WorkSchedule } from './workSchedule';

export interface Group {
  _id?: string;
  name: string;
  description?: string;
  isListed: boolean;
  workScheduleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPopulatedGroup extends Group {
  workSchedule: WorkSchedule;
}
