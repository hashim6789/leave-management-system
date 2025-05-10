import type {
  DailySchedule,
  ScheduleType,
  WorkSchedule,
} from "@/types/work-schedule";
import React, { useState, useEffect } from "react";

interface ScheduleFormProps {
  onSubmit: (schedule: WorkSchedule) => void;
  initialSchedule?: WorkSchedule | null;
  onCancel: () => void;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  onSubmit,
  initialSchedule,
  onCancel,
}) => {
  const [name, setName] = useState(initialSchedule?.name || "");
  const [type, setType] = useState<ScheduleType>(
    initialSchedule?.type || "time"
  );
  const [weeklySchedule, setWeeklySchedule] = useState<DailySchedule[]>(
    initialSchedule?.weeklySchedule ||
      daysOfWeek.map((day) => ({
        day,
        isDayOff: false,
        startTime: "09:00",
        endTime: "17:00",
        duration: 8,
      }))
  );

  useEffect(() => {
    if (initialSchedule) {
      setName(initialSchedule.name);
      setType(initialSchedule.type);
      setWeeklySchedule(initialSchedule.weeklySchedule);
    }
  }, [initialSchedule]);

  const handleDayChange = (
    index: number,
    field: keyof DailySchedule,
    value: any
  ) => {
    const newSchedule = [...weeklySchedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    if (field === "isDayOff" && value) {
      newSchedule[index] = {
        ...newSchedule[index],
        startTime: undefined,
        endTime: undefined,
        duration: undefined,
      };
    }
    setWeeklySchedule(newSchedule);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      type,
      weeklySchedule,
    });
    if (!initialSchedule) {
      setName("");
      setType("time");
      setWeeklySchedule(
        daysOfWeek.map((day) => ({
          day,
          isDayOff: false,
          startTime: "09:00",
          endTime: "17:00",
          duration: 8,
        }))
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Schedule Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Schedule Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as ScheduleType)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="time">Time-based</option>
          <option value="duration">Duration-based</option>
        </select>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Weekly Schedule
        </h3>
        {weeklySchedule.map((day, index) => (
          <div key={day.day} className="flex items-center space-x-4 mb-2">
            <span className="w-24">{day.day}</span>
            <input
              type="checkbox"
              checked={day.isDayOff}
              onChange={(e) =>
                handleDayChange(index, "isDayOff", e.target.checked)
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span>Day Off</span>
            {!day.isDayOff && type === "time" && (
              <>
                <input
                  type="time"
                  value={day.startTime || ""}
                  onChange={(e) =>
                    handleDayChange(index, "startTime", e.target.value)
                  }
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <input
                  type="time"
                  value={day.endTime || ""}
                  onChange={(e) =>
                    handleDayChange(index, "endTime", e.target.value)
                  }
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </>
            )}
            {!day.isDayOff && type === "duration" && (
              <input
                type="number"
                value={day.duration || ""}
                onChange={(e) =>
                  handleDayChange(index, "duration", parseInt(e.target.value))
                }
                min="0"
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {initialSchedule ? "Update" : "Add"} Schedule
        </button>
        {initialSchedule && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ScheduleForm;
