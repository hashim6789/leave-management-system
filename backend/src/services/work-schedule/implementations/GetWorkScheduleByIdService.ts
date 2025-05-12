import { IWorkScheduleRepository } from '@/repositories';
import { ResponseDTO } from '@/dtos';
import { IGetWorkScheduleByIdService } from '../interfaces';
import { workScheduleResponse } from '@/constants';

export class GetWorkScheduleByIdService implements IGetWorkScheduleByIdService {
  constructor(private workScheduleRepository: IWorkScheduleRepository) {
    this.workScheduleRepository = workScheduleRepository;
  }

  async execute(id: string): Promise<ResponseDTO> {
    try {
      const workSchedule = await this.workScheduleRepository.findById(id);
      if (!workSchedule) {
        return {
          data: { error: workScheduleResponse.WORK_SCHEDULE_NOT_EXIST },
          success: false,
        };
      }

      return {
        data: workSchedule,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
