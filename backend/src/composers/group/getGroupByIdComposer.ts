import { GetGroupByIdController, IController } from '@/controllers';
import { GroupModel, UserModel } from '@/models';
import {
  IGroupsRepository,
  GroupRepository,
  IUsersRepository,
  UserRepository,
} from '@/repositories';
import { GetGroupByIdService, IGetGroupByIdService } from '@/services';

export function getGroupByIdComposer(): IController {
  const repository: IGroupsRepository = new GroupRepository(GroupModel);
  const userRepository: IUsersRepository = new UserRepository(UserModel);
  const service: IGetGroupByIdService = new GetGroupByIdService(repository, userRepository);
  const controller: IController = new GetGroupByIdController(service);
  return controller;
}
