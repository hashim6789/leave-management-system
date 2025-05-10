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
import { IUserQuery, userQuerySchema } from '@/schemas';
import { IUser } from '@/models';
import { IGetUsersService } from '@/services/user';

export class GetUsersController implements IController {
  constructor(
    private getUsersService: IGetUsersService,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {
    this.getUsersService = getUsersService;
    this.httpErrors = httpErrors;
    this.httpSuccess = httpSuccess;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.query && Object.keys(httpRequest.query).length > 0) {
      const { page, limit, status, search } = httpRequest.query as IUserQuery;
      const parseResult = userQuerySchema.safeParse({
        page,
        limit,
        search,
        status,
      });

      if (!parseResult.success) {
        const firstError = parseResult.error.errors[0]?.message || 'Invalid input';
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, { error: firstError });
      }

      const getUsersDTO = parseResult.data;

      response = await this.getUsersService.execute(getUsersDTO);

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
