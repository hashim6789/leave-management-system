import { IController } from '@/controllers';
import { GetWorkSchedulesController } from '@/controllers/work-schedule';
import { WorkScheduleModel } from '@/models';
import { IWorkScheduleRepository, WorkScheduleRepository } from '@/repositories';
import { GetWorkSchedulesService, IGetWorkSchedulesService } from '@/services';

export function getWorkScheduleComposer(): IController {
  const repository: IWorkScheduleRepository = new WorkScheduleRepository(WorkScheduleModel);
  const service: IGetWorkSchedulesService = new GetWorkSchedulesService(repository);
  const controller: IController = new GetWorkSchedulesController(service);
  return controller;
}
