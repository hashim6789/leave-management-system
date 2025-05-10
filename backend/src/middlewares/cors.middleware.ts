import { corsOptions } from '@/configs';
import cors from 'cors';

/**
 * CORS middleware to be used in Express app.
 */
export const corsMiddleware = cors(corsOptions);
