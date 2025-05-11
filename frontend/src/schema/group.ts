import { z } from "zod";

export const groupSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
  workScheduleId: z
    .string()
    .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId"),
});

export type GroupFormData = z.infer<typeof groupSchema>;
