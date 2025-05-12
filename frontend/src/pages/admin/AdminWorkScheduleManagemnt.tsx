import React from "react";
import ScheduleForm from "@/forms/WorkScheduleForm";
import ScheduleTable from "@/tables/WorkScheduleTable";
import { Button } from "@/components/ui/button";
import { useSchedules } from "@/hooks/useWorkSchedule";

const AdminScheduleManagement: React.FC = () => {
  const {
    addSchedule,
    updateSchedule,
    editingSchedule,
    isModalOpen,
    openCreateModal,
    closeModal,
  } = useSchedules();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Schedule Management</h1>
      <Button onClick={openCreateModal} className="mb-4">
        Add Schedule
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <ScheduleForm
              onSubmit={editingSchedule ? updateSchedule : addSchedule}
              initialSchedule={editingSchedule}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}
      <ScheduleTable />
    </div>
  );
};

export default AdminScheduleManagement;
