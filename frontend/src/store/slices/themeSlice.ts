import type { ModeType, UserThemeType } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  mode: ModeType;
  color: UserThemeType;
}

const initialState: ThemeState = {
  mode: (localStorage.getItem("themeMode") as ModeType) || "light",
  color: (localStorage.getItem("colorTheme") as UserThemeType) || "purple",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ModeType>) {
      state.mode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },

    toggleThemeMode(state) {
      const newMode = state.mode === "light" ? "dark" : "light";
      state.mode = newMode;
      localStorage.setItem("themeMode", newMode);
    },

    setColorTheme(state, action: PayloadAction<UserThemeType>) {
      state.color = action.payload;
      localStorage.setItem("colorTheme", action.payload);
    },
  },
});

export const { setThemeMode, toggleThemeMode, setColorTheme } =
  themeSlice.actions;

export const themeReducers = themeSlice.reducer;
