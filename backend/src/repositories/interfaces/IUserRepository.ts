/* eslint-disable no-unused-vars */

import { User } from '@/types';
import { IBaseRepository } from './IBaseRepository';
import { IUser } from '@/models/User';

export interface IUsersRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): Promise<User | null>;
}
