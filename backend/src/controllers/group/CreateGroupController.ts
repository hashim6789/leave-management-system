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
import { IGroup } from '@/models';
import { ICreateGroupService } from '@/services/group';
import { GroupData, groupSchema } from '@/schemas';

export class CreateGroupController implements IController {
  constructor(
    private createGroupService: ICreateGroupService,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {
    this.createGroupService = createGroupService;
    this.httpErrors = httpErrors;
    this.httpSuccess = httpSuccess;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const { name, description, isListed } = httpRequest.body as GroupData;
      const parseResult = groupSchema.safeParse({
        name,
        description,
        isListed,
      });

      if (!parseResult.success) {
        const firstError = parseResult.error.errors[0]?.message || 'Invalid input';
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, { error: firstError });
      }

      const createGroupDTO = parseResult.data;

      response = await this.createGroupService.execute(createGroupDTO);

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
