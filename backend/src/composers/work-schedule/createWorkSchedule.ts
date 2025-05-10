import { IController } from '@/controllers';
import { CreateWorkScheduleController } from '@/controllers/work-schedule';
import { WorkScheduleModel } from '@/models';
import { IWorkScheduleRepository, WorkScheduleRepository } from '@/repositories';
import { CreateWorkScheduleService, ICreateWorkScheduleService } from '@/services';

export function createWorkScheduleComposer(): IController {
  const repository: IWorkScheduleRepository = new WorkScheduleRepository(WorkScheduleModel);
  const service: ICreateWorkScheduleService = new CreateWorkScheduleService(repository);
  const controller: IController = new CreateWorkScheduleController(service);
  return controller;
}
