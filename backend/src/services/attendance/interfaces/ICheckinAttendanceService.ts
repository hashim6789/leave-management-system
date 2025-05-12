/* eslint-disable no-unused-vars */

import { AuthData, ResponseDTO } from '@/dtos';
import { ICheckInDTO } from '@/schemas';

export interface ICheckInAttendanceService {
  execute(authData: AuthData, data: ICheckInDTO): Promise<ResponseDTO>;
}
