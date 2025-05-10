import { IUsersRepository } from '@/repositories';
import { IFetchCurrentUserService } from '../interfaces';
import { AuthData, ResponseDTO } from '@/dtos';
import { AuthResponse } from '@/constants';

export class FetchCurrentUserService implements IFetchCurrentUserService {
  constructor(private userRepository: IUsersRepository) {
    this.userRepository = userRepository;
  }

  async execute({ userId }: AuthData): Promise<ResponseDTO> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return {
          data: { error: AuthResponse.NO_USER_EXIST },
          success: false,
        };
      }

      return {
        data: user,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
