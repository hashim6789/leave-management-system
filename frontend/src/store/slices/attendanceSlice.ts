import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Attendance } from "@/types";

interface AttendanceState {
  currentAttendance: Attendance | null;
  isCheckedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  currentAttendance: null,
  isCheckedIn: false,
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    fetchAttendanceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAttendanceSuccess: (
      state,
      action: PayloadAction<Attendance | null>
    ) => {
      state.loading = false;
      state.currentAttendance = action.payload;
      state.isCheckedIn = action.payload?.status === "checked-in";
    },
    fetchAttendanceFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    checkInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    checkInSuccess: (state, action: PayloadAction<Attendance>) => {
      state.loading = false;
      state.currentAttendance = action.payload;
      state.isCheckedIn = true;
    },
    checkInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    checkOutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    checkOutSuccess: (state, action: PayloadAction<Attendance>) => {
      state.loading = false;
      state.currentAttendance = action.payload;
      state.isCheckedIn = false;
    },
    checkOutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    editCheckInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    editCheckInSuccess: (state, action: PayloadAction<Attendance>) => {
      state.loading = false;
      state.currentAttendance = action.payload;
    },
    editCheckInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    editCheckOutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    editCheckOutSuccess: (state, action: PayloadAction<Attendance>) => {
      state.loading = false;
      state.currentAttendance = action.payload;
    },
    editCheckOutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchAttendanceStart,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
  checkInStart,
  checkInSuccess,
  checkInFailure,
  checkOutStart,
  checkOutSuccess,
  checkOutFailure,
  editCheckInStart,
  editCheckInSuccess,
  editCheckInFailure,
  editCheckOutStart,
  editCheckOutSuccess,
  editCheckOutFailure,
  clearError,
} = attendanceSlice.actions;

export const attendanceReducers = attendanceSlice.reducer;
