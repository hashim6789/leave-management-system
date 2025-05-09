import type { LoginSchema } from "@/schema";
import type { User } from "@/types";
import axios from "axios";

// Create an API service to handle authentication requests
export const authService = {
  async login(data: LoginSchema): Promise<User> {
    try {
      const response = await axios.post("/api/login", data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Network or server error"
      );
    }
  },
};
