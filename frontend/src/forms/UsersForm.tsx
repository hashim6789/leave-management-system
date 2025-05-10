import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@/types";
import { userSchema, type UserFormData } from "@/schema";

interface UserFormProps {
  onSubmit:
    | ((data: Omit<User, "_id" | "isBlocked">) => void)
    | ((data: Partial<Omit<User, "_id">>) => void);
  initialUser?: User | null;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialUser,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues:
      initialUser && initialUser.role !== "admin"
        ? {
            _id: initialUser._id || "",
            username: initialUser.username,
            email: initialUser.email,
            role: initialUser.role || "employee",
            isBlocked: initialUser.isBlocked,
          }
        : {
            _id: "",
            username: "",
            email: "",
            role: "employee",
            isBlocked: false,
          },
  });

  const onFormSubmit = (data: UserFormData) => {
    const submitData: UserFormData = {
      _id: data._id || undefined,
      username: data.username,
      email: data.email,
      role: data.role,
      isBlocked: data.isBlocked,
    };
    onSubmit(submitData);
    if (!initialUser) {
      reset({
        _id: "",
        username: "",
        email: "",
        role: "employee",
        isBlocked: false,
      });
    }
  };

  useEffect(() => {
    if (initialUser) {
      reset({
        _id: initialUser._id || "",
        username: initialUser.username,
        email: initialUser.email,
        role: initialUser.role !== "admin" ? initialUser.role : "employee",
        isBlocked: initialUser.isBlocked,
      });
    }
  }, [initialUser, reset]);

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-medium text-gray-700 mb-4">
        {initialUser ? "Edit User" : "Add User"}
      </h2>

      {/* Username */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          {...register("username")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter username"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          {...register("role")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="approver">Approver</option>
          <option value="employee">Employee</option>
        </select>
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      {/* Blocked Status */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("isBlocked")}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="text-sm font-medium text-gray-700">
            Block User
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {initialUser ? "Update" : "Add"} User
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
