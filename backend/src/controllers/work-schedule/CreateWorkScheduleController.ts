import { ResponseDTO } from '@/dtos';
import { IController } from '../IController';
import {
  HttpErrors,
  HttpResponse,
  HttpSuccess,
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from '@/http/helpers';
import { WorkScheduleData, workScheduleSchema } from '@/schemas';
import { IUser } from '@/models';
import { ICreateWorkScheduleService } from '@/services';

export class CreateWorkScheduleController implements IController {
  constructor(
    private createWorkScheduleService: ICreateWorkScheduleService,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {
    this.createWorkScheduleService = createWorkScheduleService;
    this.httpErrors = httpErrors;
    this.httpSuccess = httpSuccess;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const { name, weeklySchedule, type, duration, _id, startTime, endTime } =
        httpRequest.body as WorkScheduleData;
      const parseResult = workScheduleSchema.safeParse({
        name,
        type,
        weeklySchedule,
        _id,
        duration,
        startTime,
        endTime,
      });

      if (!parseResult.success) {
        const firstError = parseResult.error.errors[0]?.message || 'Invalid input';
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, { error: firstError });
      }

      const createWorkScheduleDTO = parseResult.data;

      response = await this.createWorkScheduleService.execute(createWorkScheduleDTO);

      if (!response.success) {
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      const success = this.httpSuccess.success_200(response.data as IUser);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
