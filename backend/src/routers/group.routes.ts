import { createGroupComposer, getGroupByIdComposer, getGroupsComposer } from '@/composers';
import { expressAdapter } from '@/http/adapter';
import { verifyTokenMiddleware } from '@/middlewares';
import { Request, Response, Router } from 'express';

/**
 * Router for handling group-related routes.
 */
const groupRouter = Router();

groupRouter.post(
  '/',
  verifyTokenMiddleware(['admin']),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createGroupComposer());
    response.status(adapter.statusCode).json(adapter.body);
  },
);

groupRouter.get(
  '/:groupId',
  verifyTokenMiddleware(['admin', 'approver', 'employee']),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getGroupByIdComposer());
    response.status(adapter.statusCode).json(adapter.body);
  },
);
groupRouter.get(
  '/',
  verifyTokenMiddleware(['admin', 'approver']),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getGroupsComposer());
    response.status(adapter.statusCode).json(adapter.body);
  },
);

export { groupRouter };
