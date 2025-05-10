import React from "react";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUser";
import UserForm from "@/forms/UsersForm";
import UserTable from "@/tables/UsersTable";

const AdminUserManagement: React.FC = () => {
  const {
    addUser,
    updateUser,
    editingUser,
    isModalOpen,
    openCreateModal,
    closeModal,
  } = useUsers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Button onClick={openCreateModal} className="mb-4">
        Add User
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <UserForm
              onSubmit={editingUser ? updateUser : addUser}
              initialUser={editingUser}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}
      <UserTable />
    </div>
  );
};

export default AdminUserManagement;
