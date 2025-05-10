import type { ApiResponse, PaginatedData, User } from "@/types";
import { api, getAxiosErrorMessage, showError, showSuccess } from "@/lib";
import { userMessages } from "@/constants";

interface GetUsersParams {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export async function getUsersService(
  params: GetUsersParams
): Promise<ApiResponse<PaginatedData<User>>> {
  try {
    const response = await api.get<PaginatedData<User>>("/users", { params });
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, userMessages.FETCH_USER_FAILED);
    showError(message);
    throw new Error(message);
  }
}

export async function createUserService(
  data: Omit<User, "_id" | "isBlocked">
): Promise<ApiResponse<User>> {
  try {
    const response = await api.post<User>("/users", data);
    showSuccess(userMessages.CREATE_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, userMessages.CREATE_FAILED);
    showError(message);
    throw new Error(message);
  }
}

export async function updateUserService(
  id: string,
  data: Partial<Omit<User, "_id">>
): Promise<ApiResponse<User>> {
  try {
    const response = await api.put<User>(`/users/${id}`, data);
    showSuccess(userMessages.UPDATE_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, userMessages.UPDATE_FAILED);
    showError(message);
    throw new Error(message);
  }
}

export async function deleteUserService(
  id: string
): Promise<ApiResponse<void>> {
  try {
    const response = await api.delete(`/users/${id}`);
    showSuccess(userMessages.DELETE_SUCCESS);
    return { data: undefined, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, userMessages.DELETE_FAILED);
    showError(message);
    throw new Error(message);
  }
}
