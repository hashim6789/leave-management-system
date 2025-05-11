/* eslint-disable no-unused-vars */

import { ResponseDTO } from '@/dtos';
import { IGroupQuery } from '@/schemas';

export interface IGetGroupsService {
  execute(query: IGroupQuery): Promise<ResponseDTO>;
}
