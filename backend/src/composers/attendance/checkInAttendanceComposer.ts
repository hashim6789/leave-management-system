import { CheckInAttendanceController, IController } from '@/controllers';
import { AttendanceModel, GroupModel, UserModel, WorkScheduleModel } from '@/models';
import { ITimeValidationProvider, TimeValidationProvider } from '@/providers';
import {
  AttendanceRepository,
  GroupRepository,
  IAttendanceRepository,
  IGroupsRepository,
  IUsersRepository,
  IWorkScheduleRepository,
  UserRepository,
  WorkScheduleRepository,
} from '@/repositories';
import { CheckInAttendanceService, ICheckInAttendanceService } from '@/services';

export function checkInAttendanceComposer(): IController {
  const repository: IAttendanceRepository = new AttendanceRepository(AttendanceModel);
  const userRepository: IUsersRepository = new UserRepository(UserModel);
  const groupRepository: IGroupsRepository = new GroupRepository(GroupModel);
  const workScheduleRepository: IWorkScheduleRepository = new WorkScheduleRepository(
    WorkScheduleModel,
  );
  const timeValidationProvider: ITimeValidationProvider = new TimeValidationProvider();
  const service: ICheckInAttendanceService = new CheckInAttendanceService(
    repository,
    userRepository,
    groupRepository,
    workScheduleRepository,
    timeValidationProvider,
  );
  const controller: IController = new CheckInAttendanceController(service);
  return controller;
}
