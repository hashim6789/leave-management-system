import { AuthData, ResponseDTO } from '@/dtos';
import { IGetGroupByIdService } from '../interfaces';
import { IGroupsRepository, IUsersRepository } from '@/repositories';
import { authResponse, groupResponse } from '@/constants';

export class GetGroupByIdService implements IGetGroupByIdService {
  constructor(
    private groupRepository: IGroupsRepository,
    private userRepository: IUsersRepository,
  ) {
    this.groupRepository = groupRepository;
    this.userRepository = userRepository;
  }

  async execute(authData: AuthData, groupId: string): Promise<ResponseDTO> {
    try {
      const user = await this.userRepository.findById(authData.userId);
      if (!user || user.group.toString() !== groupId) {
        return {
          data: { error: authResponse.YOU_HAVE_NO_ACCESS },
          success: false,
        };
      }
      const group = await this.groupRepository.findById(groupId);
      if (!group) {
        return {
          data: { error: groupResponse.GROUP_NOT_EXIST },
          success: false,
        };
      }

      return {
        data: group,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
