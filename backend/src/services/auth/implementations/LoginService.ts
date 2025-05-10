import { IUsersRepository } from '@/repositories';
import { IJwtProvider, IPasswordHasher } from '@/providers/interfaces';
import { LoginSchema } from '@/schemas';
import { ResponseDTO } from '@/dtos';
import { authResponse } from '@/constants';
import { ILoginService } from '../interfaces';

export class LoginService implements ILoginService {
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
    private jwtProvider: IJwtProvider,
  ) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.jwtProvider = jwtProvider;
  }

  async execute({ email, password, role }: LoginSchema): Promise<ResponseDTO> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        return {
          data: { error: authResponse.INCORRECT_EMAIL_OR_PASSWORD },
          success: false,
        };
      }

      if (user.isBlocked || user.role !== role) {
        return {
          data: { error: authResponse.USER_IS_BLOCKED },
          success: false,
        };
      }

      const isValidPassword = await this.passwordHasher.compare(password, user.password);
      if (!isValidPassword) {
        return {
          success: false,
          data: { error: authResponse.INCORRECT_EMAIL_OR_PASSWORD },
        };
      }

      const accessToken = await this.jwtProvider.generateToken(
        {
          userId: user._id,
          role: user.role,
          email: user.email,
        },
        '1d',
      );
      const refreshToken = await this.jwtProvider.generateToken(
        {
          userId: user._id,
          role: user.role,
          email: user.email,
        },
        '5d',
      );

      return {
        data: { refreshToken, accessToken, user },
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
