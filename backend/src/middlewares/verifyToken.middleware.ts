import { Request, Response, NextFunction } from 'express';
import { Role } from '@/types';
import { AuthResponse, HttpResponse, HttpStatus } from '@/constants';
import { JwtProvider } from '@/providers/implementations/JwtProvider';

export function verifyTokenMiddleware(allowedRoles: Role[]) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      if (!accessToken || !refreshToken) {
        res.status(HttpStatus.UNAUTHORIZED).json({
          message: AuthResponse.NO_TOKEN_EXIST,
        });
        return;
      }

      const jwtProvider = new JwtProvider();
      const payload = await jwtProvider.verifyToken(accessToken);
      if (!payload) {
        res.status(HttpStatus.UNAUTHORIZED).json({
          message: AuthResponse.TOKEN_EXPIRED,
        });
        return;
      }

      if (!allowedRoles.includes(payload.role)) {
        res.status(HttpStatus.FORBIDDEN).json({
          message: AuthResponse.NO_ACCESS_PAYLOAD,
        });
        return;
      }
      const auth = payload;
      req.body = { ...req.body, auth };
      next();
    } catch (err: unknown) {
      console.error({ message: 'Error in auth middleware', error: err });
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: HttpResponse.INTERNAL_SERVER_ERROR,
      });
    }
  };
}
