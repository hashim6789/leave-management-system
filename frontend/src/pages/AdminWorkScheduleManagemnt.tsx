import React from "react";
import { Calendar } from "lucide-react";
import { Breadcrumb, TitleSection } from "@/shared/components";
import ScheduleForm from "@/forms/WorkScheduleForm";
import ScheduleTable from "@/tables/WorkScheduleTable";
import { useSchedules } from "@/hooks/useWorkSchedule";

const AdminScheduleManagement: React.FC = () => {
  const {
    schedules,
    editingSchedule,
    isModalOpen,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    startEditing,
    openCreateModal,
    closeModal,
  } = useSchedules();

  return (
    <div className="space-y-6 p-8">
      {/* Breadcrumbs */}
      <Breadcrumb
        paths={[
          { title: "Dashboard", link: "/admin/dashboard" },
          { title: "Schedules", link: "" },
        ]}
      />

      {/* Title Section */}
      <TitleSection
        icon={<Calendar className="h-6 w-6" />}
        title="Schedules Overview"
      />

      {/* Content */}
      <div className="space-y-6">
        <div className="flex justify-end">
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create New Schedule
          </button>
        </div>
        <ScheduleTable
          schedules={schedules}
          onEdit={startEditing}
          onDelete={deleteSchedule}
        />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {editingSchedule ? "Edit Schedule" : "Create New Schedule"}
                </h2>
                <ScheduleForm
                  onSubmit={editingSchedule ? updateSchedule : addSchedule}
                  initialSchedule={editingSchedule}
                  onCancel={closeModal}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminScheduleManagement;
