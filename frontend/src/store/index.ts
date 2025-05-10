import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/AuthSlice";
import { themeReducers } from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
