/* eslint-disable no-unused-vars */

import { ResponseDTO } from '@/dtos';
import { IUserQuery } from '@/schemas';

export interface IGetUsersService {
  execute(query: IUserQuery): Promise<ResponseDTO>;
}
