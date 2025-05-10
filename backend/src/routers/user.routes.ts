import { createUserComposer, getUsersComposer } from '@/composers';
import { expressAdapter } from '@/http/adapter';
import { verifyTokenMiddleware } from '@/middlewares';
import { Request, Response, Router } from 'express';

/**
 * Router for handling user-related routes.
 */
const userRouter = Router();

userRouter.post(
  '/',
  verifyTokenMiddleware(['admin']),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createUserComposer());
    response.status(adapter.statusCode).json(adapter.body);
  },
);

userRouter.get(
  '/',
  verifyTokenMiddleware(['admin', 'approver']),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getUsersComposer());
    response.status(adapter.statusCode).json(adapter.body);
  },
);

export { userRouter };
