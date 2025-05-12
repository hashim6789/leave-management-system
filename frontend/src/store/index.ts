import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/AuthSlice";
import { themeReducers } from "./slices/themeSlice";
import { attendanceReducers } from "./slices/attendanceSlice";
import { workScheduleManagementReducers } from "./slices/workScheduleManagementSlice";
import { usersManagementReducers } from "./slices/userManagementSlice";
import { groupManagementReducer } from "./slices/groupManagementSlice";
import { groupReducers } from "./slices/groupSlice";
import { workScheduleReducers } from "./slices/workScheduleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducers,
    workScheduleManagement: workScheduleManagementReducers,
    usersManagement: usersManagementReducers,
    groupsManagement: groupManagementReducer,
    attendance: attendanceReducers,
    group: groupReducers,
    workSchedule: workScheduleReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
