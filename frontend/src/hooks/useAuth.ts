import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import type { User } from "@/types";
import { loginSchema, type LoginSchema } from "@/schema";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema), // Hook up Zod resolver
  });

  // API call for login
  const login = async (data: LoginSchema) => {
    setIsLoading(true);
    setError(null); // Reset error on each attempt

    try {
      // Replace with your API endpoint
      const response = await axios.post("/api/login", data);
      setIsAuthenticated(true);
      setUser(response.data); // Store user data after successful login
    } catch (error) {
      setError("Invalid credentials or network issue"); // Set error if authentication fails
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    login,
    isLoading,
    error,
    isAuthenticated,
    user,
  };
}
