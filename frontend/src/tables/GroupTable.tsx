import React from "react";
import { Pagination } from "@/shared/components";
import FilterSearchBar from "@/shared/components/FilterSearchBar";
import { LoadingState, NoContentState } from "@/shared/Error";
import type { Group } from "@/types";
import { useGroupsTable } from "@/hooks/useGroupTable";

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
    handleEditGroup,
    handleDeleteGroup,
  } = useGroupsTable({ itemsPerPage: 5 });

  return (
    <div>
      {/* Search and Filter */}
      <FilterSearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filterValue={filterStatus}
        onFilterChange={handleFilterChange}
        placeholder="Search groups by name..."
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
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
                  {group.isListed ? "Listed" : "Unlisted"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditGroup(group)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGroup(group._id as string)}
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

export default GroupTable;
