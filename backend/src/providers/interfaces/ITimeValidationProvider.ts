/* eslint-disable no-unused-vars */
export interface ITimeValidationProvider {
  isTimeWithinWindow(
    currentTime: Date,
    startTime: string,
    endTime: string,
    gracePeriodMinutes?: number,
  ): boolean;

  hasEnoughHoursRemaining(currentTime: Date, requiredHours: number): boolean;
}
