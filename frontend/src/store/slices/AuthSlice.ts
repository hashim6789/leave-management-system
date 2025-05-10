import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Role, User } from "@/types";
import { fetchMe } from "../thunks/fetchMe";

interface AuthState {
  user: User | null;
  currentRole: Role;
  isAuthenticated: boolean;
  isBlocked: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  currentRole: "employee",
  isAuthenticated: false,
  isBlocked: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.isBlocked = user.isBlocked;
      state.currentRole = user.role;
      state.error = null;

      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Failed to store tokens in localStorage:", error);
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.currentRole = "employee";
      state.isBlocked = false;
      state.error = null;

      try {
        localStorage.removeItem("data");
        localStorage.removeItem("user");
      } catch (error) {
        console.error("Failed to delete tokens in localStorage:", error);
      }
    },
    blockUser: (state, action: PayloadAction<boolean>) => {
      state.isBlocked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isBlocked = action.payload.isBlocked;
        state.currentRole = action.payload.role;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.isAuthenticated = false;
        state.isBlocked = false;
        state.currentRole = "employee";
      });
  },
});

export const { setUser, clearUser, blockUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
