import { z } from 'zod';

export const groupSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, 'name is required'),
  description: z.string().optional(),
  isListed: z.boolean(),
});

export type GroupData = z.infer<typeof groupSchema>;

export const createGroupSchema = groupSchema.omit({
  _id: true,
});

export type CreateGroupData = z.infer<typeof createGroupSchema>;

export const groupQuerySchema = z.object({
  page: z.string().regex(/^\d+$/, { message: 'Page must be a number string' }).optional(),
  limit: z.string().regex(/^\d+$/, { message: 'Limit must be a number string' }).optional(),
  search: z.string().optional(),
  isListed: z.enum(['true', 'false']).optional(),
});
export type IGroupQuery = z.infer<typeof groupQuerySchema>;
