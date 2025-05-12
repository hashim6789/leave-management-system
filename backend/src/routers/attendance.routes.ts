import { checkInAttendanceComposer, getCurrentAttendanceComposer } from '@/composers';
import { expressAdapter } from '@/http/adapter';
import { verifyTokenMiddleware } from '@/middlewares';
import { Request, Response, Router } from 'express';

/**
 * Router for handling attendance-related routes.
 */
const attendanceRouter = Router();

attendanceRouter.get(
  '/current',
  verifyTokenMiddleware(['employee']),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getCurrentAttendanceComposer());
    response.status(adapter.statusCode).json(adapter.body);
  },
);

attendanceRouter.post(
  '/check-in',
  verifyTokenMiddleware(['employee']),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, checkInAttendanceComposer());
    response.status(adapter.statusCode).json(adapter.body);
  },
);

export { attendanceRouter };
