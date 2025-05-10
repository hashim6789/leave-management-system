import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WorkSchedule } from "@/types/work-schedule";

interface WorkScheduleState {
  schedules: WorkSchedule[];
  editingSchedule: WorkSchedule | null;
  isModalOpen: boolean;
  searchQuery: string;
  filterStatus: string;
  currentPage: number;
}

const initialState: WorkScheduleState = {
  schedules: [],
  editingSchedule: null,
  isModalOpen: false,
  searchQuery: "",
  filterStatus: "all",
  currentPage: 1,
};

const workScheduleSlice = createSlice({
  name: "workSchedule",
  initialState,
  reducers: {
    setSchedules: (state, action: PayloadAction<WorkSchedule[]>) => {
      state.schedules = action.payload;
    },
    addSchedule: (state, action: PayloadAction<WorkSchedule>) => {
      state.schedules.push({ ...action.payload, createdAt: new Date() });
      state.isModalOpen = false;
    },
    updateSchedule: (state, action: PayloadAction<WorkSchedule>) => {
      state.schedules = state.schedules.map((schedule) =>
        schedule.name === action.payload.name ? action.payload : schedule
      );
      state.editingSchedule = null;
      state.isModalOpen = false;
    },
    deleteSchedule: (state, action: PayloadAction<string>) => {
      state.schedules = state.schedules.filter(
        (schedule) => schedule.name !== action.payload
      );
    },
    startEditing: (state, action: PayloadAction<WorkSchedule>) => {
      state.editingSchedule = action.payload;
      state.isModalOpen = true;
    },
    openCreateModal: (state) => {
      state.editingSchedule = null;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.editingSchedule = null;
      state.isModalOpen = false;
    },
    resetForm: (state) => {
      state.editingSchedule = null;
      state.isModalOpen = false;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to first page on search
    },
    setFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
      state.currentPage = 1; // Reset to first page on filter change
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  addSchedule,
  updateSchedule,
  deleteSchedule,
  startEditing,
  openCreateModal,
  closeModal,
  resetForm,
  setSearchQuery,
  setFilterStatus,
  setCurrentPage,
  setSchedules,
} = workScheduleSlice.actions;

export const workScheduleReducers = workScheduleSlice.reducer;
