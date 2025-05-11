/* eslint-disable no-unused-vars */

import { PaginatedData, User } from '@/types';
import { IBaseRepository } from './IBaseRepository';
import { IUser } from '@/models/User';
import { FilterQuery } from 'mongoose';

export interface IUsersRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): Promise<User | null>;
  find(
    filter: FilterQuery<IUser>,
    page: string,
    limit: string,
    sort: Record<string, 1 | -1>,
  ): Promise<PaginatedData<IUser>>;
}
