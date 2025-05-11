import type { WorkSchedule } from "./work-schedule";

export interface Group {
  _id?: string;
  name: string;
  description?: string;
  isListed: boolean;
  workScheduleId: string;
  workSchedule: WorkSchedule;
}

export interface GetGroupsParams {
  search?: string;
  isListed?: boolean;
  page?: number;
  limit?: number;
}
