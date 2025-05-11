import { IController } from '@/controllers';
import { GetGroupsController } from '@/controllers';
import { GroupModel } from '@/models';
import { IGroupsRepository, GroupRepository } from '@/repositories';
import { GetGroupService, IGetGroupsService } from '@/services';

export function getGroupsComposer(): IController {
  const repository: IGroupsRepository = new GroupRepository(GroupModel);
  const service: IGetGroupsService = new GetGroupService(repository);
  const controller: IController = new GetGroupsController(service);
  return controller;
}
