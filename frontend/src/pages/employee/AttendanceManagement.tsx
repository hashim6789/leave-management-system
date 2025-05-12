import React, { useState } from "react";
import { useAttendance } from "@/hooks/useAttendance";
import CurrentTimeDisplay from "@/components/CurrentTimeDisplay";
import {
  CheckCircleIcon,
  ClockIcon,
  PencilIcon,
  XCircleIcon,
} from "lucide-react";

const AttendanceManagement: React.FC = () => {
  const {
    user,
    group,
    workSchedule,
    groupLoading,
    currentAttendance,
    isCheckedIn,
    loading,
    checkIn,
    checkOut,
    editCheckIn,
    editCheckOut,
  } = useAttendance();

  const [showEditModal, setShowEditModal] = useState(false);
  const [editType, setEditType] = useState<"checkIn" | "checkOut">("checkIn");
  const [editTime, setEditTime] = useState("");

  const today = new Date().toDateString();
  const requiresApproval = workSchedule?.requiresApproval || false;

  const handleCheckIn = async () => {
    await checkIn();
  };

  const handleCheckOut = async () => {
    await checkOut();
  };

  const openEditModal = (type: "checkIn" | "checkOut", currentTime: string) => {
    setEditType(type);
    setEditTime(new Date(currentTime).toISOString().slice(0, 16));
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    const newTime = new Date(editTime).toISOString();
    if (editType === "checkIn") {
      await editCheckIn(newTime);
    } else {
      await editCheckOut(newTime);
    }
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Full-screen loading overlay */}
      {groupLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <svg
              className="animate-spin h-8 w-8 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
              ></path>
            </svg>
            <span className="text-gray-800 text-lg">
              Loading group and schedule...
            </span>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700">
          Attendance Management
        </h1>

        {/* Current Time */}
        <div className="flex justify-center">
          <CurrentTimeDisplay />
        </div>

        {/* User and Group Info */}
        <section className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Employee Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-medium">Employee:</p>
              <p className="text-gray-800">{user?.username || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Group:</p>
              <p className="text-gray-800">{group?.name || "No Group"}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Work Schedule:</p>
              <p className="text-gray-800">
                {workSchedule?.name || "No Schedule"}
              </p>
            </div>
            {workSchedule && (
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <p className="text-gray-600 font-medium">Schedule Details:</p>
                <p className="text-gray-800">Type: {workSchedule.type}</p>
                {workSchedule.type === "time" && (
                  <>
                    <p className="text-gray-800">
                      Start Time: {workSchedule.startTime}
                    </p>
                    <p className="text-gray-800">
                      End Time: {workSchedule.endTime}
                    </p>
                  </>
                )}
                {workSchedule.type === "duration" && (
                  <p className="text-gray-800">
                    Required Hours: {workSchedule.requiredHours}
                  </p>
                )}
                <p className="text-gray-800">
                  Approval Required: {requiresApproval ? "Yes" : "No"}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Attendance Status */}
        <section className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Attendance Status
          </h2>
          <p className="text-lg font-medium text-gray-700 mb-4">
            Status: {isCheckedIn ? "Checked In" : "Checked Out"}
          </p>
          {currentAttendance &&
            new Date(currentAttendance.checkInTime).toDateString() ===
              today && (
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">
                      Check-In:{" "}
                      {new Date(currentAttendance.checkInTime).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      openEditModal("checkIn", currentAttendance.checkInTime)
                    }
                    className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 text-sm font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={
                      requiresApproval &&
                      currentAttendance.approvalStatus === "pending"
                    }
                    aria-label="Edit check-in time"
                  >
                    <PencilIcon className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>
                {currentAttendance.checkOutTime && (
                  <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">
                        Check-Out:{" "}
                        {new Date(
                          currentAttendance.checkOutTime
                        ).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        openEditModal(
                          "checkOut",
                          currentAttendance.checkOutTime as string
                        )
                      }
                      className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 text-sm font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                      disabled={
                        requiresApproval &&
                        currentAttendance.approvalStatus === "pending"
                      }
                      aria-label="Edit check-out time"
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                )}
                {requiresApproval && (
                  <p className="text-gray-600">
                    Approval Status: {currentAttendance.approvalStatus || "N/A"}
                  </p>
                )}
              </div>
            )}
        </section>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 sm:space-x-6">
          {!isCheckedIn ? (
            <button
              onClick={handleCheckIn}
              disabled={loading || groupLoading || !group?.workSchedule}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Check in"
            >
              {loading || groupLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    ></path>
                  </svg>
                  <span>Checking In...</span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-5 w-5" />
                  <span>Check In</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleCheckOut}
              disabled={loading || groupLoading}
              className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Check out"
            >
              {loading || groupLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    ></path>
                  </svg>
                  <span>Checking Out...</span>
                </>
              ) : (
                <>
                  <XCircleIcon className="h-5 w-5" />
                  <span>Check Out</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Edit Time Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full transform transition-all duration-300 scale-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Edit {editType === "checkIn" ? "Check-In" : "Check-Out"} Time
              </h2>
              <input
                type="datetime-local"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                max={new Date().toISOString().slice(0, 16)}
                aria-label={`Edit ${editType} time`}
              />
              {requiresApproval && (
                <p className="text-sm text-gray-500 mb-4">
                  This edit will be submitted for approval.
                </p>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                  aria-label="Cancel edit"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Submit edit"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;
