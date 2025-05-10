import { z } from 'zod';

export const userSchema = z.object({
  _id: z.string().optional(),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email format'),
  role: z.enum(['approver', 'employee'], {
    errorMap: () => ({ message: 'Role must be either Approver or Employee' }),
  }),
  isBlocked: z.boolean(),
});

export type UserData = z.infer<typeof userSchema>;

export const createUserSchema = userSchema.omit({
  _id: true,
});

export type CreateUserData = z.infer<typeof createUserSchema>;

export const userQuerySchema = z.object({
  page: z.string().regex(/^\d+$/, { message: 'Page must be a number string' }),
  limit: z.string().regex(/^\d+$/, { message: 'Limit must be a number string' }),
  search: z.string().optional(),
  status: z.enum(['time', 'duration']).optional(),
});
export type IUserQuery = z.infer<typeof userQuerySchema>;
