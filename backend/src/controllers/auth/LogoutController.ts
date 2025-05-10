import { IController } from '../IController';
import {
  HttpErrors,
  HttpResponse,
  HttpSuccess,
  IHttpErrors,
  IHttpResponse,
  IHttpSuccess,
} from '@/http/helpers';

export class LogoutController implements IController {
  constructor(
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {
    this.httpErrors = httpErrors;
    this.httpSuccess = httpSuccess;
  }

  async handle(): Promise<IHttpResponse> {
    const success = this.httpSuccess.success_200();
    return new HttpResponse(success.statusCode, success.body);
  }
}
