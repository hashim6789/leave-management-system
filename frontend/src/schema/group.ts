import { z } from "zod";

export const groupSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
});

export type GroupFormData = z.infer<typeof groupSchema>;
