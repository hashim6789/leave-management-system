import React from "react";
import { Button } from "@/components/ui/button";
import { useGroups } from "@/hooks/useGroups";
import GroupForm from "@/forms/GroupForm";
import GroupTable from "@/tables/GroupTable";

const AdminGroupManagement: React.FC = () => {
  const {
    addGroup,
    updateGroup,
    editingGroup,
    isModalOpen,
    openCreateModal,
    closeModal,
  } = useGroups();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Group Management</h1>
      <Button onClick={openCreateModal} className="mb-4">
        Add Group
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <GroupForm
              onSubmit={editingGroup ? updateGroup : addGroup}
              initialGroup={editingGroup}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}
      <GroupTable />
    </div>
  );
};

export default AdminGroupManagement;
