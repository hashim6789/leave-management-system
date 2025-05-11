import { IGroup } from '@/models/Group';
import { BaseRepository } from './BaseRepository';
import { FilterQuery, Model } from 'mongoose';
import { IGroupsRepository } from '../interfaces';
import { PaginatedData } from '@/types';

export class GroupRepository extends BaseRepository<IGroup> implements IGroupsRepository {
  constructor(model: Model<IGroup>) {
    super(model);
  }

  async find(
    filter: FilterQuery<IGroup>,
    page: string,
    limit: string,
    sort: Record<string, 1 | -1>,
  ): Promise<PaginatedData<IGroup>> {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    const [data, total] = await Promise.all([
      this.model
        .find(filter)
        .populate('workSchedule')
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
