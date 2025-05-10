import { IUser } from '@/models/User';
import { BaseRepository } from './BaseRepository';
import { Model } from 'mongoose';
import { IUsersRepository } from '../interfaces';
import { User } from '@/types';

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
}
