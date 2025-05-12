export const attendanceResponse = {
  ATTENDANCE_EXIST: 'The attendance already exist!',
  ATTENDANCE_NOT_EXIST: "The attendance doesn't exist!",
  TODAY_IS_OFF: 'Today is a day off',
  START_END_TIME_MISSING: 'Start time or end time missing for time-based schedule',
  CHECK_ALLOWED_WITHIN_GRACE_PERIOD_ONLY: `Check-in allowed only with 15-minute grace period`,
  REQUIRED_HOURS_MISSING: 'Required hours missing for duration-based schedule',
  NO_ENOUGH_HOURS_LEFT: `Not enough hours left in the day to meet working required hours`,
} as const;
