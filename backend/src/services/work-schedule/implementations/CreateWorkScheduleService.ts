import { IWorkScheduleRepository } from '@/repositories';
import { ICreateWorkScheduleDTO, ResponseDTO } from '@/dtos';
import { workScheduleResponse } from '@/constants';
import { ICreateWorkScheduleService } from '../interfaces';

export class CreateWorkScheduleService implements ICreateWorkScheduleService {
  constructor(private workScheduleRepository: IWorkScheduleRepository) {
    this.workScheduleRepository = workScheduleRepository;
  }

  async execute(data: ICreateWorkScheduleDTO): Promise<ResponseDTO> {
    try {
      const workSchedule = await this.workScheduleRepository.findOne({ name: data.name });
      if (workSchedule) {
        return {
          data: { error: workScheduleResponse.WORK_SCHEDULE_EXIST },
          success: false,
        };
      }

      const createdWorkSchedule = await this.workScheduleRepository.create(data);

      return {
        data: createdWorkSchedule,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
