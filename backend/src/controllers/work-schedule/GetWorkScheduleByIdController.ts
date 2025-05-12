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
import { workScheduleIdParamSchema, WorkScheduleIdParamSchema } from '@/schemas';
import { IWorkSchedule } from '@/models';
import { IGetWorkScheduleByIdService } from '@/services';

export class GetWorkScheduleByIdController implements IController {
  constructor(
    private getWorkScheduleByIdService: IGetWorkScheduleByIdService,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {
    this.getWorkScheduleByIdService = getWorkScheduleByIdService;
    this.httpErrors = httpErrors;
    this.httpSuccess = httpSuccess;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.path && Object.keys(httpRequest.path).length > 0) {
      const { workScheduleId } = httpRequest.path as WorkScheduleIdParamSchema;
      const parseResult = workScheduleIdParamSchema.safeParse({
        workScheduleId,
      });

      if (!parseResult.success) {
        const firstError = parseResult.error.errors[0]?.message || 'Invalid input';
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, { error: firstError });
      }

      const getWorkScheduleByIdDTO = parseResult.data;

      response = await this.getWorkScheduleByIdService.execute(
        getWorkScheduleByIdDTO.workScheduleId,
      );

      if (!response.success) {
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      const success = this.httpSuccess.success_200(response.data as IWorkSchedule);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
