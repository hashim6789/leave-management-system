/* eslint-disable no-unused-vars */

import { ICreateUserDTO, ResponseDTO } from '@/dtos';

export interface ICreateUserService {
  execute(data: ICreateUserDTO): Promise<ResponseDTO>;
}
