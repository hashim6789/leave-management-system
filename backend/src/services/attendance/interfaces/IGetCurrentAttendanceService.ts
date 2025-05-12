/* eslint-disable no-unused-vars */

import { AuthData, ResponseDTO } from '@/dtos';

export interface IGetCurrentAttendanceService {
  execute(authData: AuthData, userId: string): Promise<ResponseDTO>;
}
