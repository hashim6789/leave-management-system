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
import { checkInSchema, ICheckInDTO } from '@/schemas';
import { IWorkSchedule } from '@/models';
import { ICheckInAttendanceService } from '@/services/attendance';
import { IAuthUser } from '@/types';

export class CheckInAttendanceController implements IController {
  constructor(
    private checkInAttendanceService: ICheckInAttendanceService,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {
    this.checkInAttendanceService = checkInAttendanceService;
    this.httpErrors = httpErrors;
    this.httpSuccess = httpSuccess;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const { auth, userId, workScheduleId, groupId } = httpRequest.body as IAuthUser & ICheckInDTO;
      const parseResult = checkInSchema.safeParse({
        userId,
        workScheduleId,
        groupId,
      });

      if (!parseResult.success) {
        const firstError = parseResult.error.errors[0]?.message || 'Invalid input';
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, { error: firstError });
      }

      const getWorkScheduleByIdDTO = parseResult.data;

      response = await this.checkInAttendanceService.execute(auth, getWorkScheduleByIdDTO);

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
