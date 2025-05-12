/* eslint-disable no-unused-vars */

import { ResponseDTO } from '@/dtos';

export interface IGetWorkScheduleByIdService {
  execute(id: string): Promise<ResponseDTO>;
}
