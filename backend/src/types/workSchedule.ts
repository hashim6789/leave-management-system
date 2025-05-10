export type ScheduleType = 'time' | 'duration';

export interface DailySchedule {
  day: string; // e.g., 'Monday'
  isDayOff: boolean;
}

export interface WorkSchedule {
  name: string;
  type: ScheduleType;
  weeklySchedule: DailySchedule[];
  createdAt?: Date;
  startTime?: string; // only for time-based
  endTime?: string; // only for time-based
  duration?: number; // only for duration-based
}
