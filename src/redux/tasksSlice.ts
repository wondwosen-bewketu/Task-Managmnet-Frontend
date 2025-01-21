// taskSlice.ts (or wherever your reducer is)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  name: string;
  description: string;
}

interface TaskState {
  task: Task | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  task: null, // Ensure task is null initially
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setTask, setLoading, setError } = taskSlice.actions;
export default taskSlice.reducer;
