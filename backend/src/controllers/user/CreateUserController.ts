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
import { IUser } from '@/models';
import { ICreateUserService } from '@/services/user';
import { UserData, userSchema } from '@/schemas';

export class CreateUserController implements IController {
  constructor(
    private createUserService: ICreateUserService,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {
    this.createUserService = createUserService;
    this.httpErrors = httpErrors;
    this.httpSuccess = httpSuccess;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const { username, email, isBlocked, role } = httpRequest.body as UserData;
      const parseResult = userSchema.safeParse({
        username,
        email,
        isBlocked,
        role,
      });

      if (!parseResult.success) {
        const firstError = parseResult.error.errors[0]?.message || 'Invalid input';
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, { error: firstError });
      }

      const createUserDTO = parseResult.data;

      response = await this.createUserService.execute(createUserDTO);

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
