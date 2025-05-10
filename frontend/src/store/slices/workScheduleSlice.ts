import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WorkSchedule } from "@/types/work-schedule";

interface WorkScheduleState {
  schedules: WorkSchedule[];
  editingSchedule: WorkSchedule | null;
  isModalOpen: boolean;
}

const initialState: WorkScheduleState = {
  schedules: [],
  editingSchedule: null,
  isModalOpen: false,
};

const workScheduleSlice = createSlice({
  name: "workSchedule",
  initialState,
  reducers: {
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
} = workScheduleSlice.actions;

export const workScheduleReducers = workScheduleSlice.reducer;
