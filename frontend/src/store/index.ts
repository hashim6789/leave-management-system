import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/AuthSlice";
import { themeReducers } from "./slices/themeSlice";
import { workScheduleReducers } from "./slices/workScheduleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducers,
    workSchedule: workScheduleReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
