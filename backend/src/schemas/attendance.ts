import { z } from 'zod';

export const checkInSchema = z.object({
  userId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid MongoDB ObjectId'),
  groupId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid MongoDB ObjectId'),
  workScheduleId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid MongoDB ObjectId'),
});

export type ICheckInDTO = z.infer<typeof checkInSchema>;
