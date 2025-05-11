import { IController } from '@/controllers';
import { CreateGroupController } from '@/controllers';
import { GroupModel } from '@/models';
import { IGroupsRepository, GroupRepository } from '@/repositories';
import { CreateGroupService, ICreateGroupService } from '@/services';

export function createGroupComposer(): IController {
  const repository: IGroupsRepository = new GroupRepository(GroupModel);
  const service: ICreateGroupService = new CreateGroupService(repository);
  const controller: IController = new CreateGroupController(service);
  return controller;
}
