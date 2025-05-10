/* eslint-disable no-unused-vars */

import { ICreateWorkScheduleDTO, ResponseDTO } from '@/dtos';

export interface ICreateWorkScheduleService {
  execute(data: ICreateWorkScheduleDTO): Promise<ResponseDTO>;
}
