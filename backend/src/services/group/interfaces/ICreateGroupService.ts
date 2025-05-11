/* eslint-disable no-unused-vars */

import { ICreateGroupDTO, ResponseDTO } from '@/dtos';

export interface ICreateGroupService {
  execute(data: ICreateGroupDTO): Promise<ResponseDTO>;
}
