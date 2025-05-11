import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema, type LogoutSchema } from "@/schema";
import { clearUser, setUser } from "@/store/slices/AuthSlice";
import { useAppDispatch } from "@/store/hook";
import { loginService, logoutService } from "@/services";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema), // Hook up Zod resolver
  });

  const login = async (data: LoginSchema) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: user } = await loginService(data);
      dispatch(setUser(user));

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.role === "approver") {
        navigate("/manager/home");
      } else {
        navigate("/employee/home");
      }
    } catch {
      dispatch(clearUser());
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (data: LogoutSchema) => {
    setIsLoading(true);
    setError(null);

    try {
      const { status } = await logoutService(data);
      if (status === 200) {
        dispatch(clearUser());
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    login,
    logout,
    isLoading,
    error,
  };
}
