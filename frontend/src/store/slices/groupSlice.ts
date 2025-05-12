import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Group } from "@/types";

interface GroupState {
  group: Group | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  group: null,
  loading: false,
  error: null,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    fetchGroupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGroupSuccess: (state, action: PayloadAction<Group>) => {
      state.loading = false;
      state.group = action.payload;
    },
    fetchGroupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearGroupError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchGroupStart,
  fetchGroupSuccess,
  fetchGroupFailure,
  clearGroupError,
} = groupSlice.actions;

export const groupReducers = groupSlice.reducer;
