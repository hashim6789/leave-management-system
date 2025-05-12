import {
  IAttendanceRepository,
  IGroupsRepository,
  IUsersRepository,
  IWorkScheduleRepository,
} from '@/repositories';
import { AuthData, ResponseDTO } from '@/dtos';
import { ICheckInAttendanceService } from '../interfaces';
import { attendanceResponse, authResponse } from '@/constants';
import { ICheckInDTO } from '@/schemas';
import { ITimeValidationProvider } from '@/providers';

export class CheckInAttendanceService implements ICheckInAttendanceService {
  constructor(
    private attendanceRepository: IAttendanceRepository,
    private userRepository: IUsersRepository,
    private groupRepository: IGroupsRepository,
    private workScheduleRepository: IWorkScheduleRepository,
    private timeValidationProvider: ITimeValidationProvider,
  ) {
    this.attendanceRepository = attendanceRepository;
    this.userRepository = userRepository;
    this.groupRepository = groupRepository;
    this.workScheduleRepository = workScheduleRepository;
    this.timeValidationProvider = timeValidationProvider;
  }

  async execute(authData: AuthData, data: ICheckInDTO): Promise<ResponseDTO> {
    try {
      if (authData.userId !== data.userId) {
        return {
          data: { error: authResponse.YOU_HAVE_NO_ACCESS },
          success: false,
        };
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const attendance = await this.attendanceRepository.findOne({
        userId: data.userId,
        checkInTime: { $gte: today, $lt: tomorrow },
      });
      if (attendance) {
        return {
          data: { error: attendanceResponse.ATTENDANCE_EXIST },
          success: false,
        };
      }

      const user = await this.userRepository.findById(data.userId);
      if (!user || user.group.toString() !== data.groupId) {
        return {
          data: { error: attendanceResponse.ATTENDANCE_EXIST },
          success: false,
        };
      }
      const group = await this.groupRepository.findById(data.groupId);
      if (!group || group.workSchedule.toString() !== data.workScheduleId) {
        return {
          data: { error: attendanceResponse.ATTENDANCE_EXIST },
          success: false,
        };
      }
      const workSchedule = await this.workScheduleRepository.findById(data.workScheduleId);
      if (!workSchedule) {
        return {
          data: { error: attendanceResponse.ATTENDANCE_EXIST },
          success: false,
        };
      }

      const dayMap: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const todayDay = dayMap[today.getDay()];

      const todaySchedule = workSchedule.weeklySchedule.find(
        (schedule) => schedule.day === todayDay,
      );
      if (!todaySchedule || todaySchedule.isDayOff) {
        return {
          data: { error: attendanceResponse.TODAY_IS_OFF },
          success: false,
        };
      }

      // Validate check-in time based on work schedule type
      if (workSchedule.type === 'time') {
        if (!workSchedule.startTime || !workSchedule.endTime) {
          return {
            data: { error: attendanceResponse.START_END_TIME_MISSING },
            success: false,
          };
        }
        if (
          !this.timeValidationProvider.isTimeWithinWindow(
            today,
            workSchedule.startTime,
            workSchedule.endTime,
            15,
          )
        ) {
          return {
            data: { error: attendanceResponse.CHECK_ALLOWED_WITHIN_GRACE_PERIOD_ONLY },
            success: false,
          };
        }
      } else if (workSchedule.type === 'duration') {
        if (!workSchedule.requiredHours) {
          return {
            data: { error: attendanceResponse.REQUIRED_HOURS_MISSING },
            success: false,
          };
        }
        if (
          !this.timeValidationProvider.hasEnoughHoursRemaining(today, workSchedule.requiredHours)
        ) {
          return {
            data: { error: attendanceResponse.NO_ENOUGH_HOURS_LEFT },
            success: false,
          };
        }
      }

      // Create attendance record
      const createdAttendance = await this.attendanceRepository.create({
        ...data,
        checkInTime: today,
      });

      return {
        data: createdAttendance,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
