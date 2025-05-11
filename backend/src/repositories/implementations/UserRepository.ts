import { IUser } from '@/models/User';
import { BaseRepository } from './BaseRepository';
import { FilterQuery, Model } from 'mongoose';
import { IUsersRepository } from '../interfaces';
import { PaginatedData, User } from '@/types';

export class UserRepository extends BaseRepository<IUser> implements IUsersRepository {
  constructor(model: Model<IUser>) {
    super(model);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ email }).lean();
    if (user) {
      return {
        _id: user._id.toString(),
        email: user.email,
        username: user.username,
        role: user.role,
        password: user.password,
        isBlocked: user.isBlocked,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }
    return null;
  }

  async find(
    filter: FilterQuery<IUser>,
    page: string,
    limit: string,
    sort: Record<string, 1 | -1>,
  ): Promise<PaginatedData<IUser>> {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    const [data, total] = await Promise.all([
      this.model
        .find(filter)
        .populate('group')
        .sort(sort)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      this.model.countDocuments(filter),
    ]);

    return {
      data,
      total,
    };
  }
}
