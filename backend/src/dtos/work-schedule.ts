import { WorkSchedule } from '@/types';

export type ICreateWorkScheduleDTO = Pick<WorkSchedule, 'name' | 'type' | 'weeklySchedule'>;
