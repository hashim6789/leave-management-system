import { ICreateUserDTO, ResponseDTO } from '@/dtos';
import { groupResponse, userResponse } from '@/constants';
import { ICreateUserService } from '../interfaces';
import { IGroupsRepository, IUsersRepository } from '@/repositories';
import { IMailProvider, IPasswordProvider } from '@/providers';
import { ObjectId } from 'mongoose';

export class CreateUserService implements ICreateUserService {
  constructor(
    private userRepository: IUsersRepository,
    private groupRepository: IGroupsRepository,
    private passwordProvider: IPasswordProvider,
    private mailProvider: IMailProvider,
  ) {
    this.userRepository = userRepository;
    this.groupRepository = groupRepository;
    this.passwordProvider = passwordProvider;
    this.mailProvider = mailProvider;
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

      if (data.groupId) {
        const group = await this.groupRepository.findById(data.groupId);

        if (!group) {
          return {
            data: { error: groupResponse.GROUP_NOT_EXIST },
            success: false,
          };
        }
      }
      const generatedPassword = await this.passwordProvider.generate(6, true);
      if (!(await this.mailProvider.sendPasswordMail(data.email, generatedPassword))) {
        return {
          data: { error: userResponse.MAIL_NOT_SENT },
          success: false,
        };
      }
      const hashedPassword = await this.passwordProvider.hash(generatedPassword);

      const groupId = data.groupId as unknown as ObjectId;
      const createdUser = await this.userRepository.create({
        ...data,
        password: hashedPassword,
        group: groupId,
      });

      return {
        data: createdUser,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
