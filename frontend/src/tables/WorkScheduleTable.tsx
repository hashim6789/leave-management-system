import { useSchedulesTable } from "@/hooks/useWorkScheduleTable";
import { Pagination } from "@/shared/components";
import FilterSearchBar from "@/shared/components/FilterSearchBar";
import { LoadingState, NoContentState } from "@/shared/Error";
import type { Days } from "@/types";
import React from "react";

const dayLabels: Record<Days, string> = {
  MON: "Monday",
  TUE: "Tuesday",
  WED: "Wednesday",
  THU: "Thursday",
  FRI: "Friday",
  SAT: "Saturday",
  SUN: "Sunday",
};

const filterOptions = ["time", "duration"];

const ScheduleTable: React.FC = () => {
  const {
    data,
    loading,
    currentPage,
    searchQuery,
    filterStatus,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleEditSchedule,
    handleDeleteSchedule,
  } = useSchedulesTable({ itemsPerPage: 5 });

  return (
    <div>
      {/* Search and Filter */}
      <FilterSearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filterValue={filterStatus}
        onFilterChange={handleFilterChange}
        placeholder="Search schedules..."
        options={filterOptions}
      />

      {/* Loading and Error States */}
      {loading && <LoadingState />}
      {data.length === 0 && <NoContentState />}

      {/* Table */}
      {data.length > 0 && (
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
            {data.map((schedule) => {
              const workingDaysCount = schedule.weeklySchedule.filter(
                (day) => !day.isDayOff
              ).length;
              return (
                <tr key={schedule.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {schedule.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {schedule.type}
                  </td>
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
                    {/* {schedule.createdAt?.toLocaleDateString()} */}
                    {/* {schedule.createdAt} */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditSchedule(schedule)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSchedule(schedule.name)}
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
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ScheduleTable;
