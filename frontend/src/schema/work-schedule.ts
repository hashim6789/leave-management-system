import * as z from "zod";

export const dailyScheduleSchema = z.object({
  day: z.enum(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]),
  isDayOff: z.boolean(),
});

export const workScheduleSchema = z
  .object({
    _id: z.string().optional(),
    name: z.string().min(1, "Schedule name is required"),
    type: z.enum(["time", "duration"]),
    weeklySchedule: z.array(dailyScheduleSchema),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    duration: z.number().optional(),
  })
  .refine(
    (data) => {
      // Validate 1–2 days off
      const dayOffCount = data.weeklySchedule.filter(
        (day) => day.isDayOff
      ).length;
      if (dayOffCount < 1 || dayOffCount > 2) {
        return false;
      }
      return true;
    },
    {
      message: "Must have at least 1 and at most 2 days off per week",
      path: ["weeklySchedule"],
    }
  )
  .refine(
    (data) => {
      // Time-based: Validate startTime and endTime
      if (data.type === "time") {
        if (!data.startTime || !data.endTime) {
          return false;
        }
        const start = new Date(`1970-01-01T${data.startTime}:00`);
        const end = new Date(`1970-01-01T${data.endTime}:00`);
        const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        const workingDays = data.weeklySchedule.filter(
          (day) => !day.isDayOff
        ).length;
        const weeklyHours = diffHours * workingDays;

        // Ensure endTime is after startTime and daily hours are 1–12
        if (diffHours <= 0 || diffHours > 12) {
          return false;
        }
        // Ensure weekly hours are 30–48
        if (weeklyHours < 30 || weeklyHours > 48) {
          return false;
        }
        return true;
      }
      return true;
    },
    {
      message:
        "For time-based schedules, end time must be after start time, daily hours must be 1–12, and weekly hours must be 30–48",
      path: ["startTime"],
    }
  )
  .refine(
    (data) => {
      // Duration-based: Validate duration 30–48
      if (data.type === "duration") {
        return (
          data.duration !== undefined &&
          data.duration >= 30 &&
          data.duration <= 48
        );
      }
      return true;
    },
    {
      message:
        "Weekly hours must be between 30 and 48 for duration-based schedules",
      path: ["duration"],
    }
  );

export type WorkScheduleFormData = z.infer<typeof workScheduleSchema>;
