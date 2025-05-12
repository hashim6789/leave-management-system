import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WorkSchedule } from "@/types";

interface WorkScheduleState {
  workSchedule: WorkSchedule | null;
  loading: boolean;
  error: string | null;
}

const initialState: WorkScheduleState = {
  workSchedule: null,
  loading: false,
  error: null,
};

const workScheduleSlice = createSlice({
  name: "workSchedule",
  initialState,
  reducers: {
    fetchWorkScheduleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWorkScheduleSuccess: (state, action: PayloadAction<WorkSchedule>) => {
      state.loading = false;
      state.workSchedule = action.payload;
    },
    fetchWorkScheduleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearWorkScheduleError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchWorkScheduleStart,
  fetchWorkScheduleSuccess,
  fetchWorkScheduleFailure,
  clearWorkScheduleError,
} = workScheduleSlice.actions;

export const workScheduleReducers = workScheduleSlice.reducer;
