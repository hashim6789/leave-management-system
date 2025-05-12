import { IController } from '@/controllers';
import { GetCurrentAttendanceController } from '@/controllers';
import { AttendanceModel } from '@/models';
import { AttendanceRepository, IAttendanceRepository } from '@/repositories';
import { GetCurrentAttendanceService, IGetCurrentAttendanceService } from '@/services';

export function getCurrentAttendanceComposer(): IController {
  const repository: IAttendanceRepository = new AttendanceRepository(AttendanceModel);
  const service: IGetCurrentAttendanceService = new GetCurrentAttendanceService(repository);
  const controller: IController = new GetCurrentAttendanceController(service);
  return controller;
}
