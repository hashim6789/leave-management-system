import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Group, WorkSchedule } from "@/types";
import { groupSchema, type GroupFormData } from "@/schema";
import { getSchedulesService } from "@/services";

interface GroupFormProps {
  onSubmit:
    | ((data: Omit<Group, "_id">) => void)
    | ((data: Partial<Group> & { _id: string }) => void);
  initialGroup?: Group | null;
  onCancel: () => void;
}

const GroupForm: React.FC<GroupFormProps> = ({
  onSubmit,
  initialGroup,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: initialGroup
      ? {
          _id: initialGroup._id || "",
          name: initialGroup.name,
          description: initialGroup.description || "",
          workScheduleId:
            initialGroup.workSchedule?._id || initialGroup.workScheduleId || "",
        }
      : {
          _id: "",
          name: "",
          description: "",
          workScheduleId: "",
        },
  });

  const [workSchedules, setWorkSchedules] = useState<WorkSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch work schedules
  useEffect(() => {
    const fetchWorkSchedules = async () => {
      setLoading(true);
      try {
        const { data } = await getSchedulesService({ limit: 100 }); // Fetch all work schedules
        setWorkSchedules(data.data);
      } catch (err) {
        setError("Failed to fetch work schedules");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkSchedules();
  }, []);

  const onFormSubmit = (data: GroupFormData) => {
    if (initialGroup) {
      const submitData: Partial<Group> & { _id: string } = {
        _id: data._id || initialGroup._id!,
        name: data.name,
        description: data.description,
        workScheduleId: data.workScheduleId,
      };
      (onSubmit as (data: Partial<Group> & { _id: string }) => void)(
        submitData
      );
    } else {
      const submitData: Omit<Group, "_id"> = {
        name: data.name,
        description: data.description,
        isListed: true,
        workScheduleId: data.workScheduleId,
      };
      (onSubmit as (data: Omit<Group, "_id">) => void)(submitData);
    }
    if (!initialGroup) {
      reset({ _id: "", name: "", description: "", workScheduleId: "" });
    }
  };

  useEffect(() => {
    if (initialGroup) {
      reset({
        _id: initialGroup._id || "",
        name: initialGroup.name,
        description: initialGroup.description || "",
        workScheduleId:
          initialGroup.workSchedule?._id || initialGroup.workScheduleId || "",
      });
    }
  }, [initialGroup, reset]);

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-medium text-gray-700 mb-4">
        {initialGroup ? "Edit Group" : "Add Group"}
      </h2>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {loading && (
        <p className="mb-4 text-sm text-gray-600">Loading work schedules...</p>
      )}

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Group Name
        </label>
        <input
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter group name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter group description"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Work Schedule */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Work Schedule
        </label>
        <select
          {...register("workScheduleId")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a Work Schedule</option>
          {workSchedules.map((schedule) => (
            <option key={schedule._id} value={schedule._id}>
              {schedule.name}
            </option>
          ))}
        </select>
        {errors.workScheduleId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.workScheduleId.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
        >
          {initialGroup ? "Update" : "Add"} Group
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

export default GroupForm;
