/* eslint-disable no-unused-vars */
import { z } from 'zod';

export const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid MongoDB ObjectId');

export const createPathParamSchema = <T extends string>(paramName: T) => {
  return z.object({
    [paramName]: objectIdSchema,
  }) as z.ZodObject<{ [K in T]: typeof objectIdSchema }>;
};

export const userIdParamSchema = createPathParamSchema('userId');
export const workScheduleIdParamSchema = createPathParamSchema('workScheduleId');
export const groupIdParamSchema = createPathParamSchema('groupId');

export type WorkScheduleIdParamSchema = z.infer<typeof workScheduleIdParamSchema>; // { userId: string }
export type UserIdParamSchema = z.infer<typeof userIdParamSchema>; // { userId: string }
export type GroupIdParamSchema = z.infer<typeof groupIdParamSchema>; // { userId: string }
