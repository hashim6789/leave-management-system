import { FetchCurrentUserController, IController } from '@/controllers';
import { UserModel } from '@/models';
import { IUsersRepository, UserRepository } from '@/repositories';
import { FetchCurrentUserService, IFetchCurrentUserService } from '@/services';

export function fetchCurrentUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const service: IFetchCurrentUserService = new FetchCurrentUserService(repository);
  const controller: IController = new FetchCurrentUserController(service);
  return controller;
}
