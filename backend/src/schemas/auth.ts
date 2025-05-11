import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').nonempty('Email is required'),
  password: z
    .string()
    .min(6, 'Password should be at least 6 characters long')
    .nonempty('Password is required'),
  role: z.enum(['admin', 'approver', 'employee'], {
    required_error: 'Role is required',
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const authSchema = z.object({
  userId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid MongoDB ObjectId'),
  email: z.string().email('Please enter a valid email address').nonempty('Email is required'),
  role: z.enum(['admin', 'approver', 'employee'], {
    required_error: 'Role is required',
  }),
});

export type AuthSchema = z.infer<typeof authSchema>;
