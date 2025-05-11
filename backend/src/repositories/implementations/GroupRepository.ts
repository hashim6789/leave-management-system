import { IGroup } from '@/models/Group';
import { BaseRepository } from './BaseRepository';
import { Model } from 'mongoose';
import { IGroupsRepository } from '../interfaces';

export class GroupRepository extends BaseRepository<IGroup> implements IGroupsRepository {
  constructor(model: Model<IGroup>) {
    super(model);
  }
}
