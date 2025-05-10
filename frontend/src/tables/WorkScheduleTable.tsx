import React from "react";
import type { WorkSchedule, Days } from "@/types/work-schedule";

const dayLabels: Record<Days, string> = {
  MON: "Monday",
  TUE: "Tuesday",
  WED: "Wednesday",
  THU: "Thursday",
  FRI: "Friday",
  SAT: "Saturday",
  SUN: "Sunday",
};

interface ScheduleTableProps {
  schedules: WorkSchedule[];
  onEdit: (schedule: WorkSchedule) => void;
  onDelete: (name: string) => void;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  schedules,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Schedule
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {schedules.map((schedule) => {
            const workingDaysCount = schedule.weeklySchedule.filter(
              (day) => !day.isDayOff
            ).length;
            return (
              <tr key={schedule.name}>
                <td className="px-6 py-4 whitespace-nowrap">{schedule.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{schedule.type}</td>
                <td className="px-6 py-4">
                  {schedule.weeklySchedule.map((day) => (
                    <div key={day.day}>
                      {dayLabels[day.day]}:{" "}
                      {day.isDayOff
                        ? "Day Off"
                        : schedule.type === "time"
                        ? `${schedule.startTime} - ${schedule.endTime}`
                        : `${(
                            (schedule.duration || 0) / workingDaysCount
                          ).toFixed(2)} hours`}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {schedule.createdAt?.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(schedule)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(schedule.name)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
