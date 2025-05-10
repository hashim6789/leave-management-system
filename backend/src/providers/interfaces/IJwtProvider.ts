/* eslint-disable no-unused-vars */
import { JwtPayload } from '@/types';
export interface IJwtProvider {
  generateToken(payload: JwtPayload, expiresIn?: '1h' | '5d'): Promise<string>;
  verifyToken(token: string): Promise<JwtPayload | null>;
}
