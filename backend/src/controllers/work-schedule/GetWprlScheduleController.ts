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
import { IWorkScheduleQuery, workScheduleQuerySchema } from '@/schemas';
import { IUser } from '@/models';
import { IGetWorkSchedulesService } from '@/services';

export class GetWorkSchedulesController implements IController {
  constructor(
    private getWorkSchedulesService: IGetWorkSchedulesService,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {
    this.getWorkSchedulesService = getWorkSchedulesService;
    this.httpErrors = httpErrors;
    this.httpSuccess = httpSuccess;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.query && Object.keys(httpRequest.query).length > 0) {
      const { page, limit, status } = httpRequest.query as IWorkScheduleQuery;
      const parseResult = workScheduleQuerySchema.safeParse({
        page,
        limit,
        status,
      });

      if (!parseResult.success) {
        const firstError = parseResult.error.errors[0]?.message || 'Invalid input';
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, { error: firstError });
      }

      const getWorkSchedulesDTO = parseResult.data;

      response = await this.getWorkSchedulesService.execute(getWorkSchedulesDTO);

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
