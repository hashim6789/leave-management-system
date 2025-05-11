/* eslint-disable no-unused-vars */

import { FilterQuery } from 'mongoose';
import { IBaseRepository } from './IBaseRepository';
import { IGroup } from '@/models/Group';
import { PaginatedData } from '@/types';

export interface IGroupsRepository extends IBaseRepository<IGroup> {
  find(
    filter: FilterQuery<IGroup>,
    page: string,
    limit: string,
    sort: Record<string, 1 | -1>,
  ): Promise<PaginatedData<IGroup>>;
}
