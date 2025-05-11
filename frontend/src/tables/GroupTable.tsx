import React from "react";
import { Pagination } from "@/shared/components";
import FilterSearchBar from "@/shared/components/FilterSearchBar";
import { LoadingState, NoContentState } from "@/shared/Error";
import type { Group } from "@/types";
import { useGroups } from "@/hooks/useGroups";
import { useGroupsTable } from "@/hooks/useGroupTable";
import GroupForm from "@/forms/GroupForm";

const filterOptions = ["all", "listed", "unlisted"];

const GroupTable: React.FC = () => {
  const {
    data,
    loading,
    error,
    currentPage,
    searchQuery,
    filterStatus,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
  } = useGroupsTable({ itemsPerPage: 5 });

  const {
    editingGroup,
    isModalOpen,
    openCreateModal,
    openEditModal,
    closeModal,
    addGroup,
    updateGroup,
    removeGroup,
  } = useGroups();

  return (
    <div>
      <button
        onClick={openCreateModal}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Add Group
      </button>
      <FilterSearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filterValue={filterStatus}
        onFilterChange={handleFilterChange}
        placeholder="Search groups by name..."
        options={filterOptions}
      />
      {loading && <LoadingState />}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!loading && !error && data.length === 0 && <NoContentState />}
      {data.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Work Schedule
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((group: Group) => (
              <tr key={group._id}>
                <td className="px-6 py-4 whitespace-nowrap">{group.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {group.description || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {group.workSchedule?.name || "No Schedule"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {group.isListed ? "Listed" : "Unlisted"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => openEditModal(group)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeGroup(group._id!)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <GroupForm
            onSubmit={editingGroup ? updateGroup : addGroup}
            initialGroup={editingGroup}
            onCancel={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default GroupTable;
