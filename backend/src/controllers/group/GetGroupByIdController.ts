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
import { GroupIdParamSchema, groupIdParamSchema } from '@/schemas';
import { IGroup } from '@/models';
import { IGetGroupByIdService } from '@/services/group';
import { IAuthUser } from '@/types';

export class GetGroupByIdController implements IController {
  constructor(
    private getGroupByIdService: IGetGroupByIdService,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {
    this.getGroupByIdService = getGroupByIdService;
    this.httpErrors = httpErrors;
    this.httpSuccess = httpSuccess;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.path &&
      httpRequest.body &&
      Object.keys(httpRequest.path).length > 0 &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const { groupId } = httpRequest.path as GroupIdParamSchema;
      const { auth } = httpRequest.body as IAuthUser;
      const parseResult = groupIdParamSchema.safeParse({
        groupId,
      });

      if (!parseResult.success) {
        const firstError = parseResult.error.errors[0]?.message || 'Invalid input';
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, { error: firstError });
      }

      const getGroupByIdDTO = parseResult.data;

      response = await this.getGroupByIdService.execute(auth, getGroupByIdDTO.groupId);

      if (!response.success) {
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      const success = this.httpSuccess.success_200(response.data as IGroup);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
