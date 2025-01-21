import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import subtaskReducer from "./subtaskSlice";

// Configuring the Redux store
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    subtask: subtaskReducer,
  },
});

// Optional: Exporting types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
