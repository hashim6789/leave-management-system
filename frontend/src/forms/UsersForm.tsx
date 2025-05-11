import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User, Group } from "@/types";
import { userSchema, type UserFormData } from "@/schema";
import { getGroupsService } from "@/services";

interface UserFormProps {
  onSubmit:
    | ((data: Omit<User, "_id" | "isBlocked"> & { groupId?: string }) => void)
    | ((data: Partial<Omit<User, "_id">> & { groupId?: string }) => void);
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
            groupId: initialUser.group?._id || initialUser.groupId || "",
          }
        : {
            _id: "",
            username: "",
            email: "",
            role: "employee",
            isBlocked: false,
            groupId: "",
          },
  });

  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const { data } = await getGroupsService({ limit: 100 }); // Fetch all groups
        setGroups(data.data);
      } catch (err) {
        setError("Failed to fetch groups");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const onFormSubmit = (data: UserFormData) => {
    const submitData: UserFormData = {
      _id: data._id || undefined,
      username: data.username,
      email: data.email,
      role: data.role,
      isBlocked: data.isBlocked,
      groupId: data.groupId || undefined,
    };
    onSubmit(submitData);
    if (!initialUser) {
      reset({
        _id: "",
        username: "",
        email: "",
        role: "employee",
        isBlocked: false,
        groupId: "",
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
        groupId: initialUser.group?._id || initialUser.groupId || "",
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

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {loading && (
        <p className="mb-4 text-sm text-gray-600">Loading groups...</p>
      )}

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

      {/* Group */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Group</label>
        <select
          {...register("groupId")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a Group</option>
          {groups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.name}
            </option>
          ))}
        </select>
        {errors.groupId && (
          <p className="mt-1 text-sm text-red-600">{errors.groupId.message}</p>
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
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
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
