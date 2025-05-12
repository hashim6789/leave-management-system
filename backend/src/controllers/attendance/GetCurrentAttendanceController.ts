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
import { userIdParamSchema, UserIdParamSchema } from '@/schemas';
import { IWorkSchedule } from '@/models';
import { IGetCurrentAttendanceService } from '@/services/attendance';
import { IAuthUser } from '@/types';

export class GetCurrentAttendanceController implements IController {
  constructor(
    private getCurrentAttendanceService: IGetCurrentAttendanceService,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {
    this.getCurrentAttendanceService = getCurrentAttendanceService;
    this.httpErrors = httpErrors;
    this.httpSuccess = httpSuccess;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.query &&
      httpRequest.body &&
      Object.keys(httpRequest.query).length > 0 &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const { userId } = httpRequest.query as UserIdParamSchema;
      const { auth } = httpRequest.body as IAuthUser;
      const parseResult = userIdParamSchema.safeParse({
        userId,
      });

      if (!parseResult.success) {
        const firstError = parseResult.error.errors[0]?.message || 'Invalid input';
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, { error: firstError });
      }

      const getWorkScheduleByIdDTO = parseResult.data;

      response = await this.getCurrentAttendanceService.execute(
        auth,
        getWorkScheduleByIdDTO.userId,
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
