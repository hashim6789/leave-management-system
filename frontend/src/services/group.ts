import type {
  ApiResponse,
  PaginatedData,
  Group,
  GetGroupsParams,
} from "@/types";
import { api, getAxiosErrorMessage, showError, showSuccess } from "@/lib";
import { groupMessages } from "@/constants";

export async function getGroupsService(
  params: GetGroupsParams
): Promise<ApiResponse<PaginatedData<Group>>> {
  try {
    const response = await api.get<PaginatedData<Group>>("/groups", { params });
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(
      error,
      groupMessages.FETCH_GROUP_FAILED
    );
    showError(message);
    throw new Error(message);
  }
}

export async function createGroupService(
  data: Omit<Group, "_id">
): Promise<ApiResponse<Group>> {
  try {
    const response = await api.post<Group>("/groups", data);
    showSuccess(groupMessages.CREATE_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, groupMessages.CREATE_FAILED);
    showError(message);
    throw new Error(message);
  }
}

export async function updateGroupService(
  id: string,
  data: Partial<Omit<Group, "_id">>
): Promise<ApiResponse<Group>> {
  try {
    const response = await api.put<Group>(`/groups/${id}`, data);
    showSuccess(groupMessages.UPDATE_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, groupMessages.UPDATE_FAILED);
    showError(message);
    throw new Error(message);
  }
}

export async function deleteGroupService(
  id: string
): Promise<ApiResponse<void>> {
  try {
    const response = await api.delete(`/groups/${id}`);
    showSuccess(groupMessages.DELETE_SUCCESS);
    return { data: undefined, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, groupMessages.DELETE_FAILED);
    showError(message);
    throw new Error(message);
  }
}
export async function fetchGroupByIdService(
  groupId: string
): Promise<ApiResponse<Group>> {
  try {
    const response = await api.get<Group>(`/groups/${groupId}`);
    showSuccess(groupMessages.FETCH_GROUP_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(
      error,
      groupMessages.FETCH_GROUP_FAILED
    );
    showError(message);
    throw new Error(message);
  }
}
