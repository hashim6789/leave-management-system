import { IController } from '@/controllers';
import { CreateUserController } from '@/controllers/user';
import { UserModel } from '@/models';
import { IMailProvider, IPasswordProvider, MailProvider, PasswordProvider } from '@/providers';
import { IUsersRepository, UserRepository } from '@/repositories';
import { CreateUserService, ICreateUserService } from '@/services/user';

export function createUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const passwordProvider: IPasswordProvider = new PasswordProvider();
  const mailProvider: IMailProvider = new MailProvider();
  const service: ICreateUserService = new CreateUserService(
    repository,
    passwordProvider,
    mailProvider,
  );
  const controller: IController = new CreateUserController(service);
  return controller;
}
