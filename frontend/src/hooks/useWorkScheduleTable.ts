import { useMemo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setSearchQuery,
  setFilterStatus,
  setCurrentPage,
  deleteSchedule,
  startEditing,
  setSchedules,
} from "@/store/slices/workScheduleManagementSlice";
import type { WorkSchedule } from "@/types";
import { getSchedulesService } from "@/services";

interface UseSchedulesTableProps {
  itemsPerPage: number;
}

// Custom debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useSchedulesTable = ({ itemsPerPage }: UseSchedulesTableProps) => {
  const dispatch = useAppDispatch();
  const { schedules, searchQuery, filterStatus, currentPage } =
    useAppSelector().workSchedule;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  // Debounce search query (500ms delay)
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch schedules using the service
  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getSchedulesService({
          search: debouncedSearchQuery || undefined,
          status: filterStatus === "all" ? undefined : filterStatus,
          page: currentPage,
          limit: itemsPerPage,
        });
        dispatch(setSchedules(data.data));
        setTotalItems(data.total);
      } catch (err) {
        setError("Failed to fetch schedules");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [debouncedSearchQuery, filterStatus, currentPage, itemsPerPage, dispatch]);

  // Local filtering (optional, can be removed if backend handles all filtering)
  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const matchesSearch = schedule.name
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || schedule.type === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [schedules, debouncedSearchQuery, filterStatus]);

  // Pagination logic
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedSchedules = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSchedules.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSchedules, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
    dispatch(setCurrentPage(1)); // Reset to first page on search
  };

  const handleFilterChange = (filter: string) => {
    dispatch(setFilterStatus(filter));
    dispatch(setCurrentPage(1)); // Reset to first page on filter change
  };

  const handleEditSchedule = (schedule: WorkSchedule) => {
    dispatch(startEditing(schedule));
  };

  const handleDeleteSchedule = (name: string) => {
    dispatch(deleteSchedule(name));
  };

  return {
    data: paginatedSchedules,
    loading,
    error,
    currentPage,
    searchQuery,
    filterStatus,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleEditSchedule,
    handleDeleteSchedule,
  };
};
