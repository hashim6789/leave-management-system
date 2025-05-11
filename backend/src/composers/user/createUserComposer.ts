import { IController } from '@/controllers';
import { CreateUserController } from '@/controllers/user';
import { GroupModel, UserModel } from '@/models';
import { IMailProvider, IPasswordProvider, MailProvider, PasswordProvider } from '@/providers';
import {
  GroupRepository,
  IGroupsRepository,
  IUsersRepository,
  UserRepository,
} from '@/repositories';
import { CreateUserService, ICreateUserService } from '@/services/user';

export function createUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const groupRepository: IGroupsRepository = new GroupRepository(GroupModel);
  const passwordProvider: IPasswordProvider = new PasswordProvider();
  const mailProvider: IMailProvider = new MailProvider();
  const service: ICreateUserService = new CreateUserService(
    repository,
    groupRepository,
    passwordProvider,
    mailProvider,
  );
  const controller: IController = new CreateUserController(service);
  return controller;
}
