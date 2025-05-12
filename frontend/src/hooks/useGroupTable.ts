import { useMemo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setSearchQuery,
  setFilterStatus,
  setCurrentPage,
  deleteGroup,
  startEditing,
  setGroups,
} from "@/store/slices/groupManagementSlice";
import { getGroupsService } from "@/services";
import type { Group } from "@/types";
import { useDebounce } from "./useDebounce";

interface UseGroupsTableProps {
  itemsPerPage: number;
}

export const useGroupsTable = ({ itemsPerPage }: UseGroupsTableProps) => {
  const dispatch = useAppDispatch();
  const { groups, searchQuery, filterStatus, currentPage } =
    useAppSelector().groups;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getGroupsService({
          search: debouncedSearchQuery || undefined,
          isListed:
            filterStatus === "all"
              ? undefined
              : filterStatus === "listed"
              ? true
              : false,
          page: currentPage,
          limit: itemsPerPage,
        });
        dispatch(setGroups(data.data));
        setTotalItems(data.total);
      } catch (err) {
        setError("Failed to fetch groups");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [debouncedSearchQuery, filterStatus, currentPage, itemsPerPage, dispatch]);

  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      const matchesSearch =
        group.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        (group.description &&
          group.description
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase()));
      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "listed" && group.isListed) ||
        (filterStatus === "unlisted" && !group.isListed);
      return matchesSearch && matchesFilter;
    });
  }, [groups, debouncedSearchQuery, filterStatus]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedGroups = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredGroups.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredGroups, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
    dispatch(setCurrentPage(1));
  };

  const handleFilterChange = (status: string) => {
    dispatch(setFilterStatus(status));
    dispatch(setCurrentPage(1));
  };

  const handleEditGroup = (group: Group) => {
    dispatch(startEditing(group));
  };

  const handleDeleteGroup = (id: string) => {
    dispatch(deleteGroup(id));
  };

  return {
    data: paginatedGroups,
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
  };
};
