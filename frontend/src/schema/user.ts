import { z } from "zod";

export const userSchema = z.object({
  _id: z.string().optional(),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  role: z.enum(["approver", "employee"], {
    errorMap: () => ({ message: "Role must be either Approver or Employee" }),
  }),
  isBlocked: z.boolean(),
});

export type UserFormData = z.infer<typeof userSchema>;
