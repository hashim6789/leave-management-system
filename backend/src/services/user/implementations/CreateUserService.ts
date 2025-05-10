import { ICreateUserDTO, ResponseDTO } from '@/dtos';
import { userResponse } from '@/constants';
import { ICreateUserService } from '../interfaces';
import { IUsersRepository } from '@/repositories';

export class CreateUserService implements ICreateUserService {
  constructor(private userRepository: IUsersRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: ICreateUserDTO): Promise<ResponseDTO> {
    try {
      const user = await this.userRepository.findOne({ email: data.email });
      if (user) {
        return {
          data: { error: userResponse.USER_EXIST },
          success: false,
        };
      }

      const createdUser = await this.userRepository.create(data);

      return {
        data: createdUser,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
