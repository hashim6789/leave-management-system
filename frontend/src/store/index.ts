import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/AuthSlice";
import { themeReducers } from "./slices/themeSlice";
import { workScheduleReducers } from "./slices/workScheduleSlice";
import { usersReducers } from "./slices/userSlice";
import { groupsReducer } from "./slices/groupSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducers,
    workSchedule: workScheduleReducers,
    users: usersReducers,
    groups: groupsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
