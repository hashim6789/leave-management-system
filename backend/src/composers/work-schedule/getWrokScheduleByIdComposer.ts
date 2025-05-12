import { IController } from '@/controllers';
import { GetWorkScheduleByIdController } from '@/controllers/work-schedule';
import { WorkScheduleModel } from '@/models';
import { IWorkScheduleRepository, WorkScheduleRepository } from '@/repositories';
import { GetWorkScheduleByIdService, IGetWorkScheduleByIdService } from '@/services';

export function getWorkScheduleByIdComposer(): IController {
  const repository: IWorkScheduleRepository = new WorkScheduleRepository(WorkScheduleModel);
  const service: IGetWorkScheduleByIdService = new GetWorkScheduleByIdService(repository);
  const controller: IController = new GetWorkScheduleByIdController(service);
  return controller;
}
