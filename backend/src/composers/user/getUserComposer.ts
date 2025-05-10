import { IController } from '@/controllers';
import { GetUsersController } from '@/controllers/user';
import { UserModel } from '@/models';
import { IUsersRepository, UserRepository } from '@/repositories';
import { GetUsersService, IGetUsersService } from '@/services/user';

export function getUsersComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const service: IGetUsersService = new GetUsersService(repository);
  const controller: IController = new GetUsersController(service);
  return controller;
}
