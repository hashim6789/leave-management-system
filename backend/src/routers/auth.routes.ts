import { fetchCurrentUserComposer, loginComposer, logoutComposer } from '@/composers';
import { ENV } from '@/configs';
import { expressAdapter } from '@/http/adapter';
import { verifyTokenMiddleware } from '@/middlewares';
import { Request, Response, Router } from 'express';

/**
 * Router for handling auth-related routes.
 */
const authRouter = Router();

authRouter.post('/login', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, loginComposer());
  if (adapter.statusCode === 200) {
    response.cookie(ENV.KEY_OF_ACCESS as string, adapter.body.accessToken, {
      httpOnly: false,
      // maxAge: 1 * 60 * 1000,
      maxAge: 1 * 24 * 60 * 60 * 1000, //for development
    });
    response.cookie(ENV.KEY_OF_REFRESH as string, adapter.body.refreshToken, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
  }
  response
    .status(adapter.statusCode)
    .json(adapter.statusCode === 400 ? adapter.body : adapter.body.user);
});

authRouter.get(
  '/me',
  verifyTokenMiddleware(['admin', 'employee', 'approver']),

  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, fetchCurrentUserComposer());
    response.status(adapter.statusCode).json(adapter.body);
  },
);

/**
 * Endpoint to logout users.
 */
authRouter.post('/logout', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, logoutComposer());
  if (adapter.statusCode === 200) {
    response.clearCookie(ENV.KEY_OF_ACCESS as string);
    response.clearCookie(ENV.KEY_OF_REFRESH as string);
  }
  response.status(adapter.statusCode).json({ success: adapter.statusCode === 200 });
});

export { authRouter };
