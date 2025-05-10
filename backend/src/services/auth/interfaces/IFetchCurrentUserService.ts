/* eslint-disable no-unused-vars */

import { AuthData, ResponseDTO } from '@/dtos';

export interface IFetchCurrentUserService {
  execute(data: AuthData): Promise<ResponseDTO>;
}
