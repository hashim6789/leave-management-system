import { ResponseDTO } from '@/dtos';
import { IGroupQuery } from '@/schemas';
import { IGetGroupsService } from '../interfaces';
import { IGroupsRepository } from '@/repositories';
import { FilterQuery } from 'mongoose';
import { IGroup } from '@/models';

export class GetGroupService implements IGetGroupsService {
  constructor(private groupRepository: IGroupsRepository) {
    this.groupRepository = groupRepository;
  }

  async execute({ page, limit, isListed, search }: IGroupQuery): Promise<ResponseDTO> {
    try {
      const filter: FilterQuery<IGroup> =
        isListed === 'true'
          ? { isListed: true }
          : isListed === 'false'
            ? { isListed: false }
            : { isListed: { $exists: true } };

      if (search) {
        filter.name = { $regex: search, $options: 'i' };
      }
      const paginatedGroups = await this.groupRepository.find(filter, page, limit, {});

      return {
        data: paginatedGroups,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
