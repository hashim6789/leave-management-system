import { ICreateUserDTO, ResponseDTO } from '@/dtos';
import { userResponse } from '@/constants';
import { ICreateUserService } from '../interfaces';
import { IUsersRepository } from '@/repositories';
import { IMailProvider, IPasswordProvider } from '@/providers';

export class CreateUserService implements ICreateUserService {
  constructor(
    private userRepository: IUsersRepository,
    private passwordProvider: IPasswordProvider,
    private mailProvider: IMailProvider,
  ) {
    this.userRepository = userRepository;
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
      const generatedPassword = await this.passwordProvider.generate(6, true);
      if (!(await this.mailProvider.sendPasswordMail(data.email, generatedPassword))) {
        return {
          data: { error: userResponse.MAIL_NOT_SENT },
          success: false,
        };
      }
      const hashedPassword = await this.passwordProvider.hash(generatedPassword);

      const createdUser = await this.userRepository.create({ ...data, password: hashedPassword });

      return {
        data: createdUser,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
