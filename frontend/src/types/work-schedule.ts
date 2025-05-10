export type ScheduleType = "time" | "duration";
export type Days = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export interface DailySchedule {
  day: Days;
  isDayOff: boolean;
}

export interface WorkSchedule {
  _id?: string;
  name: string;
  type: ScheduleType;
  weeklySchedule: DailySchedule[];
  createdAt?: Date;
  startTime?: string;
  endTime?: string;
  duration?: number;
}
