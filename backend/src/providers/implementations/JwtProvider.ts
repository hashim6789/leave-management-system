import { sign, SignOptions, verify } from 'jsonwebtoken';
import { IJwtProvider } from '../interfaces';
import { JwtPayload } from '@/types';
import { ENV } from '@/configs';

export class JwtProvider implements IJwtProvider {
  /**
   * Generate a JWT token
   * @param payload - User-related data
   * @param expiresIn - Expiration time (default: 1h)
   * @returns JWT token
   */
  async generateToken(payload: JwtPayload, expiresIn: '1d' | '5d' = '1d'): Promise<string> {
    const secretKey: string = ENV.JWT_SECRET ?? '';

    if (!secretKey) {
      throw new Error('JWT_SECRET is missing in environment variables.');
    }

    const options: SignOptions = {
      expiresIn,
      audience: String(payload.userId),
    };

    return sign(payload, secretKey, options);
  }

  /**
   * Verify a JWT token
   * @param token - Token to validate
   * @returns Decoded token payload or null if invalid
   */
  async verifyToken(token: string): Promise<JwtPayload | null> {
    const secretKey: string = ENV.JWT_SECRET ?? '';

    return verify(token, secretKey) as JwtPayload | null;
  }
}
