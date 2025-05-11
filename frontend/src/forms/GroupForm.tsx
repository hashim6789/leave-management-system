import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Group } from "@/types";
import { groupSchema, type GroupFormData } from "@/schema";

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
        }
      : {
          _id: "",
          name: "",
          description: "",
        },
  });

  const onFormSubmit = (data: GroupFormData) => {
    if (initialGroup) {
      const submitData: Partial<Group> & { _id: string } = {
        _id: data._id || initialGroup._id!,
        name: data.name,
        description: data.description,
      };
      (onSubmit as (data: Partial<Group> & { _id: string }) => void)(
        submitData
      );
    } else {
      const submitData: Omit<Group, "_id"> = {
        name: data.name,
        description: data.description,
        isListed: true,
      };
      (onSubmit as (data: Omit<Group, "_id">) => void)(submitData);
    }
    if (!initialGroup) {
      reset({ _id: "", name: "", description: "" });
    }
  };

  useEffect(() => {
    if (initialGroup) {
      reset({
        _id: initialGroup._id || "",
        name: initialGroup.name,
        description: initialGroup.description || "",
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

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
