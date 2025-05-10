import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  WorkSchedule,
  DailySchedule,
  ScheduleType,
  Days,
} from "@/types/work-schedule";
import { workScheduleSchema, type WorkScheduleFormData } from "@/schema";

const daysOfWeek: { label: string; value: Days }[] = [
  { label: "Monday", value: "MON" },
  { label: "Tuesday", value: "TUE" },
  { label: "Wednesday", value: "WED" },
  { label: "Thursday", value: "THU" },
  { label: "Friday", value: "FRI" },
  { label: "Saturday", value: "SAT" },
  { label: "Sunday", value: "SUN" },
];

interface ScheduleFormProps {
  onSubmit: (schedule: WorkSchedule) => void;
  initialSchedule?: WorkSchedule | null;
  onCancel: () => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  onSubmit,
  initialSchedule,
  onCancel,
}) => {
  const defaultWeeklySchedule: DailySchedule[] = daysOfWeek.map(
    ({ value }) => ({
      day: value,
      isDayOff: value === "SUN", // Default to Sunday off
    })
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<WorkScheduleFormData>({
    resolver: zodResolver(workScheduleSchema),
    defaultValues: initialSchedule
      ? {
          _id: initialSchedule._id || "",
          name: initialSchedule.name,
          type: initialSchedule.type,
          weeklySchedule: initialSchedule.weeklySchedule,
          startTime: initialSchedule.startTime || "09:00",
          endTime: initialSchedule.endTime || "17:00",
          duration: initialSchedule.duration || 40,
        }
      : {
          _id: "",
          name: "",
          type: "time" as ScheduleType,
          weeklySchedule: defaultWeeklySchedule,
          startTime: "09:00",
          endTime: "17:00",
          duration: 40,
        },
  });

  const { fields } = useFieldArray({
    control,
    name: "weeklySchedule",
  });

  const type = watch("type");

  const onFormSubmit = (data: WorkScheduleFormData) => {
    const submitData: WorkSchedule = {
      _id: data._id || undefined,
      name: data.name,
      type: data.type,
      weeklySchedule: data.weeklySchedule,
      startTime: data.type === "time" ? data.startTime : undefined,
      endTime: data.type === "time" ? data.endTime : undefined,
      duration: data.type === "duration" ? data.duration : undefined,
    };
    onSubmit(submitData);
    if (!initialSchedule) {
      reset({
        _id: "",
        name: "",
        type: "time",
        weeklySchedule: defaultWeeklySchedule,
        startTime: "09:00",
        endTime: "17:00",
        duration: 40,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Schedule Name
        </label>
        <input
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Schedule Type
        </label>
        <select
          {...register("type")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="time">Time-based</option>
          <option value="duration">Duration-based</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Days Off (Select 1–2 days)
        </h3>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-4 mb-2">
            <span className="w-24">
              {daysOfWeek.find((d) => d.value === field.day)?.label}
            </span>
            <input
              type="checkbox"
              {...register(`weeklySchedule.${index}.isDayOff`)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span>Day Off</span>
          </div>
        ))}
        {errors.weeklySchedule && (
          <p className="mt-1 text-sm text-red-600">
            {errors.weeklySchedule.message}
          </p>
        )}
      </div>
      {type === "time" && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Daily Working Hours
          </h3>
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                {...register("startTime")}
                className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.startTime && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.startTime.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                type="time"
                {...register("endTime")}
                className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.endTime && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {type === "duration" && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Weekly Working Hours
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Weekly Hours (30–48)
            </label>
            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              min="30"
              max="48"
              className="mt-1 w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600">
                {errors.duration.message}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {initialSchedule ? "Update" : "Add"} Schedule
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

export default ScheduleForm;
