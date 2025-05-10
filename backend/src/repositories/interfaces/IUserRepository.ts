/* eslint-disable no-unused-vars */

import { User } from '@/types';
import { IBaseRepository } from './IBaseRepository';
import { IUser } from '@/models/User';

export interface IUsersRepository extends IBaseRepository<IUser> {
  //   create(data: ICreateUserRequestDTO): Promise<IUserOutRequestDTO>;
  findByEmail(email: string): Promise<User | null>;
  //   findById(id: string): Promise<IUserDetailOutDTO | unknown>;
  //   findAll(query: QueryUser): Promise<PaginationDTO>;
  //   update(
  //     // user: IUserOutRequestDTO,
  //     userId: string,
  //     data: IUpdateUserRequestDTO
  //   ): Promise<IUserOutRequestDTO | null>;
  //   delete(id: string): Promise<void>;
  //   getUsersAnalysis(): Promise<{
  //     learnerData: UserStatusData[];
  //     mentorData: UserStatusData[];
  //   }>;
  //   getUserData(id: string, role: SignupRole): Promise<UserDataDTO>;
}
