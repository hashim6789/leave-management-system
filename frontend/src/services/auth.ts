import type { LoginSchema } from "@/schema";
import type { ApiResponse, User } from "@/types";
import {
  axiosInstance,
  getAxiosErrorMessage,
  showError,
  showSuccess,
} from "@/lib";
import { AuthMessages } from "@/constants";

export async function loginService(
  data: LoginSchema
): Promise<ApiResponse<User>> {
  try {
    const response = await axiosInstance.post<User>("/api/login", data);
    showSuccess(AuthMessages.LOGIN_SUCCESS);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, AuthMessages.LOGIN_FAILED);
    showError(message);
    throw new Error(message);
  }
}
