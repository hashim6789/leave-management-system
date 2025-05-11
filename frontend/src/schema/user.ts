import { z } from "zod";

export const userSchema = z.object({
  _id: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["approver", "employee"]),
  isBlocked: z.boolean(),
  groupId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId"),
});

export type UserFormData = z.infer<typeof userSchema>;
