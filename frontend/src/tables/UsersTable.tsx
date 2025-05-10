import React from "react";
import { Pagination } from "@/shared/components";
import FilterSearchBar from "@/shared/components/FilterSearchBar";
import { LoadingState, NoContentState } from "@/shared/Error";
import type { User } from "@/types";
import { useUsersTable } from "@/hooks/useUserTable";

const filterOptions = ["all", "approver", "employee"];

const UserTable: React.FC = () => {
  const {
    data,
    loading,
    error,
    currentPage,
    searchQuery,
    filterRole,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleEditUser,
    handleDeleteUser,
  } = useUsersTable({ itemsPerPage: 5 });

  return (
    <div>
      {/* Search and Filter */}
      <FilterSearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filterValue={filterRole}
        onFilterChange={handleFilterChange}
        placeholder="Search users by username or email..."
        options={filterOptions}
      />

      {/* Loading and Error States */}
      {loading && <LoadingState />}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!loading && !error && data.length === 0 && <NoContentState />}

      {/* Table */}
      {data.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
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
            {data.map((user: User) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.isBlocked ? "Blocked" : "Active"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
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

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserTable;
