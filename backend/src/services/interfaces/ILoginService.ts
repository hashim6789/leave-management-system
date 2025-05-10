/* eslint-disable no-unused-vars */

import { ResponseDTO } from '@/dtos';
import { LoginSchema } from '@/schemas';

export interface ILoginService {
  execute(data: LoginSchema): Promise<ResponseDTO>;
}
