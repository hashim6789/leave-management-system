import { ResponseDTO } from '@/dtos';
import { IUserQuery } from '@/schemas';
import { IGetUsersService } from '../interfaces';
import { IUsersRepository } from '@/repositories';
import { FilterQuery } from 'mongoose';
import { IUser } from '@/models';

export class GetUsersService implements IGetUsersService {
  constructor(private userRepository: IUsersRepository) {
    this.userRepository = userRepository;
  }

  async execute({ page, limit, status, search }: IUserQuery): Promise<ResponseDTO> {
    try {
      const filter: FilterQuery<IUser> = status ? { type: status } : {};
      filter.$or = [{ role: 'employee' }, { role: 'approver' }];

      if (search) {
        filter.$or = [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ];
      }
      const paginatedUsers = await this.userRepository.find(filter, page, limit, {});

      return {
        data: paginatedUsers,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
