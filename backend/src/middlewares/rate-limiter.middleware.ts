import { rateLimitConfig } from '@/configs';
import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit(rateLimitConfig);
