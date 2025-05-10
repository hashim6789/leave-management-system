import { Request } from 'express';
import { HttpRequest, IHttpResponse } from './helpers';
import { IController } from '@/controllers';

export async function expressAdapter(req: Request, apiRoute: IController): Promise<IHttpResponse> {
  const httpRequest = new HttpRequest({
    headers: req.header,
    query: req.query,
    body: req.body,
    path: req.params,
  });

  const httpResponse = await apiRoute.handle(httpRequest);
  return httpResponse;
}
