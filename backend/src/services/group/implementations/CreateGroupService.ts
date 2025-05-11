import { ICreateGroupDTO, ResponseDTO } from '@/dtos';
import { groupResponse } from '@/constants';
import { ICreateGroupService } from '../interfaces';
import { IGroupsRepository } from '@/repositories';
import { ObjectId } from 'mongoose';

export class CreateGroupService implements ICreateGroupService {
  constructor(private groupRepository: IGroupsRepository) {
    this.groupRepository = groupRepository;
  }

  async execute(data: ICreateGroupDTO): Promise<ResponseDTO> {
    try {
      const group = await this.groupRepository.findOne({
        name: { $regex: data.name, $options: 'i' },
      });
      if (group) {
        return {
          data: { error: groupResponse.GROUP_EXIST },
          success: false,
        };
      }

      const workScheduleId = data.workScheduleId as unknown as ObjectId;
      const createdGroup = await this.groupRepository.create({
        ...data,
        workSchedule: workScheduleId,
      });

      return {
        data: createdGroup,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
