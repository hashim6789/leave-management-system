import { ITimeValidationProvider } from '../interfaces';

export class TimeValidationProvider implements ITimeValidationProvider {
  private parseTimeToDate(time: string, baseDate: Date = new Date()): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date(baseDate);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  public isTimeWithinWindow(
    currentTime: Date,
    startTime: string,
    endTime: string,
    gracePeriodMinutes: number = 15,
  ): boolean {
    const start = this.parseTimeToDate(startTime, currentTime);
    const end = this.parseTimeToDate(endTime, currentTime);

    const graceStart = new Date(start.getTime() - gracePeriodMinutes * 60 * 1000);

    return currentTime >= graceStart && currentTime <= end;
  }

  public hasEnoughHoursRemaining(currentTime: Date, requiredHours: number): boolean {
    const endOfDay = new Date(currentTime);
    endOfDay.setHours(23, 59, 59, 999);
    const hoursLeft = (endOfDay.getTime() - currentTime.getTime()) / (1000 * 60 * 60);
    return hoursLeft >= requiredHours;
  }
}
