import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters long")
    .nonempty("Password is required"),
  role: z.enum(["admin", "manager", "employee"], {
    required_error: "Role is required",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
