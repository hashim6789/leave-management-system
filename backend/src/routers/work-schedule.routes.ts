import { createWorkScheduleComposer } from '@/composers';
import { expressAdapter } from '@/http/adapter';
import { verifyTokenMiddleware } from '@/middlewares';
import { Request, Response, Router } from 'express';

/**
 * Router for handling workSchedule-related routes.
 */
const workScheduleRouter = Router();

workScheduleRouter.post(
  '/',
  verifyTokenMiddleware(['admin']),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createWorkScheduleComposer());
    response.status(adapter.statusCode).json(adapter.body);
  },
);

export { workScheduleRouter };
