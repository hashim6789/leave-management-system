/* eslint-disable no-unused-vars */

import { ResponseDTO } from '@/dtos';
import { IWorkScheduleQuery } from '@/schemas';

export interface IGetWorkSchedulesService {
  execute(query: IWorkScheduleQuery): Promise<ResponseDTO>;
}
