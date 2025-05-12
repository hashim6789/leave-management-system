import type { ApiResponse, PaginatedData, WorkSchedule } from "@/types";
import { api, getAxiosErrorMessage, showError, showSuccess } from "@/lib";
import { scheduleMessages } from "@/constants";

interface GetSchedulesParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export async function getSchedulesService(
  params: GetSchedulesParams
): Promise<ApiResponse<PaginatedData<WorkSchedule>>> {
  try {
    const response = await api.get<PaginatedData<WorkSchedule>>(
      "/work-schedules",
      {
        params,
      }
    );
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, scheduleMessages.FETCH_FAILED);
    showError(message);
    throw new Error(message);
  }
}

export async function createScheduleService(
  data: Omit<WorkSchedule, "createdAt">
): Promise<ApiResponse<WorkSchedule>> {
  try {
    const response = await api.post<WorkSchedule>("/work-schedules", data);
    showSuccess(scheduleMessages.CREATE_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, scheduleMessages.CREATE_FAILED);
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
    showSuccess(scheduleMessages.UPDATE_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, scheduleMessages.UPDATE_FAILED);
    showError(message);
    throw new Error(message);
  }
}

export async function fetchWorkScheduleByIdService(
  id: string
): Promise<ApiResponse<WorkSchedule>> {
  try {
    const response = await api.get<WorkSchedule>(`/work-schedules/${id}`);
    showSuccess(scheduleMessages.FETCH_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, scheduleMessages.FETCH_FAILED);
    showError(message);
    throw new Error(message);
  }
}

export async function deleteScheduleService(
  id: string
): Promise<ApiResponse<void>> {
  try {
    const response = await api.delete(`/work-schedules/${id}`);
    showSuccess(scheduleMessages.DELETE_SUCCESS);
    return { data: undefined, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, scheduleMessages.DELETE_FAILED);
    showError(message);
    throw new Error(message);
  }
}
