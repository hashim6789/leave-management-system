import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";

interface UserState {
  users: User[];
  searchQuery: string;
  filterRole: string;
  currentPage: number;
  editingUser: User | null;
}

const initialState: UserState = {
  users: [],
  searchQuery: "",
  filterRole: "all",
  currentPage: 1,
  editingUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilterRole: (state, action: PayloadAction<string>) => {
      state.filterRole = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    startEditing: (state, action: PayloadAction<User>) => {
      state.editingUser = action.payload;
    },
    clearEditing: (state) => {
      state.editingUser = null;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
});

export const {
  setUsers,
  setSearchQuery,
  setFilterRole,
  setCurrentPage,
  startEditing,
  clearEditing,
  deleteUser,
} = userSlice.actions;

export const usersReducers = userSlice.reducer;
