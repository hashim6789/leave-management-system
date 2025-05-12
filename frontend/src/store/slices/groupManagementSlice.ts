import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Group } from "@/types";

interface GroupState {
  groups: Group[];
  searchQuery: string;
  filterStatus: string;
  currentPage: number;
  editingGroup: Group | null;
}

const initialState: GroupState = {
  groups: [],
  searchQuery: "",
  filterStatus: "all",
  currentPage: 1,
  editingGroup: null,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    startEditing: (state, action: PayloadAction<Group>) => {
      state.editingGroup = action.payload;
    },
    clearEditing: (state) => {
      state.editingGroup = null;
    },
    deleteGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(
        (group) => group._id !== action.payload
      );
    },
  },
});

export const {
  setGroups,
  setSearchQuery,
  setFilterStatus,
  setCurrentPage,
  startEditing,
  clearEditing,
  deleteGroup,
} = groupSlice.actions;

export const groupManagementReducer = groupSlice.reducer;
