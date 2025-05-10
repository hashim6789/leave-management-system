import type { ApiResponse, WorkSchedule } from "@/types";
import { api, getAxiosErrorMessage, showError, showSuccess } from "@/lib";
import { ScheduleMessages } from "@/constants";

export async function createScheduleService(
  data: Omit<WorkSchedule, "createdAt">
): Promise<ApiResponse<WorkSchedule>> {
  try {
    const response = await api.post<WorkSchedule>("/work-schedules", data);
    showSuccess(ScheduleMessages.CREATE_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, ScheduleMessages.CREATE_FAILED);
    showError(message);
    throw new Error(message);
  }
}

export async function updateScheduleService(
  id: string,
  data: Omit<WorkSchedule, "createdAt">
): Promise<ApiResponse<WorkSchedule>> {
  try {
    const response = await api.put<WorkSchedule>(`/work-schedules/${id}`, data);
    showSuccess(ScheduleMessages.UPDATE_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, ScheduleMessages.UPDATE_FAILED);
    showError(message);
    throw new Error(message);
  }
}

export async function deleteScheduleService(
  id: string
): Promise<ApiResponse<void>> {
  try {
    const response = await api.delete(`/work-schedules/${id}`);
    showSuccess(ScheduleMessages.DELETE_SUCCESS);
    return { data: undefined, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, ScheduleMessages.DELETE_FAILED);
    showError(message);
    throw new Error(message);
  }
}
