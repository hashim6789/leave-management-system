import { IController, LoginController } from '@/controllers';
import { UserModel } from '@/models';
import { JwtProvider } from '@/providers/implementations/JwtProvider';
import { PasswordProvider } from '@/providers/implementations/PasswordProvider';
import { IJwtProvider, IPasswordProvider } from '@/providers/interfaces';
import { IUsersRepository, UserRepository } from '@/repositories';
import { ILoginService, LoginService } from '@/services';

export function loginComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const passwordHasher: IPasswordProvider = new PasswordProvider();
  const generateTokenProvider: IJwtProvider = new JwtProvider();
  const service: ILoginService = new LoginService(
    repository,
    passwordHasher,
    generateTokenProvider,
  );
  const controller: IController = new LoginController(service);
  return controller;
}
