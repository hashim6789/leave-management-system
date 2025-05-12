import { useMemo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setSearchQuery,
  setFilterRole,
  setCurrentPage,
  deleteUser,
  startEditing,
  setUsers,
} from "@/store/slices/userManagementSlice";
import { getUsersService } from "@/services";
import type { User } from "@/types";
import { useDebounce } from "./useDebounce";

interface UseUsersTableProps {
  itemsPerPage: number;
}

export const useUsersTable = ({ itemsPerPage }: UseUsersTableProps) => {
  const dispatch = useAppDispatch();
  const { users, searchQuery, filterRole, currentPage } =
    useAppSelector().users;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getUsersService({
          search: debouncedSearchQuery || undefined,
          role: filterRole === "all" ? undefined : filterRole,
          page: currentPage,
          limit: itemsPerPage,
        });
        dispatch(setUsers(data.data));
        setTotalItems(data.total);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearchQuery, filterRole, currentPage, itemsPerPage, dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.username
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesFilter = filterRole === "all" || user.role === filterRole;
      return matchesSearch && matchesFilter;
    });
  }, [users, debouncedSearchQuery, filterRole]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
    dispatch(setCurrentPage(1));
  };

  const handleFilterChange = (role: string) => {
    dispatch(setFilterRole(role));
    dispatch(setCurrentPage(1));
  };

  const handleEditUser = (user: User) => {
    dispatch(startEditing(user));
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  return {
    data: paginatedUsers,
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
  };
};
