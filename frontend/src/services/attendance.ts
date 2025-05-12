import type {
  ApiResponse,
  Attendance,
  Group,
  User,
  WorkSchedule,
} from "@/types";
import { api, getAxiosErrorMessage, showError, showSuccess } from "@/lib";
import { attendanceMessages } from "@/constants";

interface CheckInData {
  userId: string;
  groupId: string;
  workScheduleId: string;
}

interface CheckOutData {
  attendanceId: string;
}

export async function checkInService(
  data: CheckInData
): Promise<ApiResponse<Attendance>> {
  try {
    const response = await api.post<Attendance>("/attendance/check-in", data);
    showSuccess(attendanceMessages.CHECK_IN_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(
      error,
      attendanceMessages.CHECK_IN_FAILED
    );
    showError(message);
    throw new Error(message);
  }
}

export async function checkOutService(
  data: CheckOutData
): Promise<ApiResponse<Attendance>> {
  try {
    const response = await api.post<Attendance>("/attendance/check-out", data);
    showSuccess(attendanceMessages.CHECK_OUT_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(
      error,
      attendanceMessages.CHECK_OUT_FAILED
    );
    showError(message);
    throw new Error(message);
  }
}

export const attendanceService = {
  fetchAttendance: async (userId: string): Promise<ApiResponse<Attendance>> => {
    try {
      const response = await api.get<Attendance>("/attendance/current", {
        params: { userId },
      });
      return { data: response.data, status: response.status };
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(
        error,
        attendanceMessages.FETCH_FAILED
      );
      showError(message);
      throw new Error(message);
    }
  },

  checkIn: async (
    user: User,
    group: Group,
    workSchedule: WorkSchedule,
    today: number
  ): Promise<ApiResponse<Attendance>> => {
    if (!user._id || !user.group || !group || !group.workSchedule) {
      const message = "User, group, or work schedule not found";
      showError(message);
      throw new Error(message);
    }
    const dayMap: string[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const todaySchedule = workSchedule.weeklySchedule.find(
      (schedule) => schedule.day === dayMap[today]
    );
    if (todaySchedule?.isDayOff) {
      showError(attendanceMessages.DAY_OFF);
      throw new Error(attendanceMessages.DAY_OFF);
    }
    return checkInService({
      userId: user._id,
      groupId: user.group,
      workScheduleId: group.workSchedule,
    });
  },

  checkOut: async (attendanceId: string): Promise<ApiResponse<Attendance>> => {
    return checkOutService({ attendanceId });
  },

  editCheckIn: async (
    attendanceId: string,
    newTime: string,
    requiresApproval: boolean
  ): Promise<ApiResponse<Attendance>> => {
    const editDate = new Date(newTime);
    const today = new Date();
    if (editDate.toDateString() !== today.toDateString()) {
      showError(attendanceMessages.EDIT_TIME_NOT_TODAY);
      throw new Error(attendanceMessages.EDIT_TIME_NOT_TODAY);
    }
    try {
      const response = await api.patch<Attendance>(
        "/attendance/edit-check-in",
        {
          attendanceId,
          newCheckInTime: newTime,
          requiresApproval,
        }
      );
      showSuccess(
        requiresApproval
          ? "Check-in edit request submitted for approval"
          : attendanceMessages.EDIT_CHECK_IN_SUCCESS
      );
      return { data: response.data, status: response.status };
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(
        error,
        attendanceMessages.EDIT_CHECK_IN_FAILED
      );
      showError(message);
      throw new Error(message);
    }
  },

  editCheckOut: async (
    attendanceId: string,
    newTime: string,
    requiresApproval: boolean
  ): Promise<ApiResponse<Attendance>> => {
    const editDate = new Date(newTime);
    const today = new Date();
    if (editDate.toDateString() !== today.toDateString()) {
      showError(attendanceMessages.EDIT_TIME_NOT_TODAY);
      throw new Error(attendanceMessages.EDIT_TIME_NOT_TODAY);
    }
    try {
      const response = await api.patch<Attendance>(
        "/attendance/edit-check-out",
        {
          attendanceId,
          newCheckOutTime: newTime,
          requiresApproval,
        }
      );
      showSuccess(
        requiresApproval
          ? "Check-out edit request submitted for approval"
          : attendanceMessages.EDIT_CHECK_OUT_SUCCESS
      );
      return { data: response.data, status: response.status };
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(
        error,
        attendanceMessages.EDIT_CHECK_OUT_FAILED
      );
      showError(message);
      throw new Error(message);
    }
  },
};
