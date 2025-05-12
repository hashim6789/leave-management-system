/* eslint-disable no-unused-vars */

import { AuthData, ResponseDTO } from '@/dtos';

export interface IGetGroupByIdService {
  execute(authData: AuthData, groupId: string): Promise<ResponseDTO>;
}
