import { IAttendanceRepository } from '@/repositories';
import { AuthData, ResponseDTO } from '@/dtos';
import { IGetCurrentAttendanceService } from '../interfaces';
import { attendanceResponse, authResponse } from '@/constants';

export class GetCurrentAttendanceService implements IGetCurrentAttendanceService {
  constructor(private attendanceRepository: IAttendanceRepository) {
    this.attendanceRepository = attendanceRepository;
  }

  async execute(authData: AuthData, userId: string): Promise<ResponseDTO> {
    try {
      if (authData.userId !== userId) {
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
        userId,
        checkInTime: { $gte: today, $lt: tomorrow },
      });
      if (!attendance) {
        return {
          data: { error: attendanceResponse.ATTENDANCE_NOT_EXIST },
          success: false,
        };
      }

      return {
        data: attendance,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
