import { IWorkScheduleRepository } from '@/repositories';
import { ResponseDTO } from '@/dtos';
import { IGetWorkSchedulesService } from '../interfaces';
import { IWorkScheduleQuery } from '@/schemas';

export class GetWorkSchedulesService implements IGetWorkSchedulesService {
  constructor(private workScheduleRepository: IWorkScheduleRepository) {
    this.workScheduleRepository = workScheduleRepository;
  }

  async execute({ page, limit, status }: IWorkScheduleQuery): Promise<ResponseDTO> {
    try {
      const filter = status ? { type: status } : {};
      const paginatedWorkSchedules = await this.workScheduleRepository.find(
        filter,
        page,
        limit,
        {},
      );

      return {
        data: paginatedWorkSchedules,
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
