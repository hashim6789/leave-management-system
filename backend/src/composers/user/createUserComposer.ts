import { IController } from '@/controllers';
import { CreateUserController } from '@/controllers/user';
import { UserModel } from '@/models';
import { IUsersRepository, UserRepository } from '@/repositories';
import { CreateUserService, ICreateUserService } from '@/services/user';

export function createUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const service: ICreateUserService = new CreateUserService(repository);
  const controller: IController = new CreateUserController(service);
  return controller;
}
