import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, SubTask } from "../../types";

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  task: Task | null;
  loading: boolean;
  error: string | null;
  totalTasks: number;
  currentPage: number;
  statusFilter: string;
  priorityFilter: string;
  searchQuery: string;
}

const initialState: TaskState = {
  tasks: [],
  filteredTasks: [],
  task: null,
  loading: false,
  error: null,
  totalTasks: 0,
  currentPage: 1,
  statusFilter: "all",
  priorityFilter: "all",
  searchQuery: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    setFilteredTasks(state, action: PayloadAction<Task[]>) {
      state.filteredTasks = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    },
    setPriorityFilter(state, action: PayloadAction<string>) {
      state.priorityFilter = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setTotalTasks(state, action: PayloadAction<number>) {
      state.totalTasks = action.payload;
    },
    setTask(state, action: PayloadAction<Task | null>) {
      state.task = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    addSubtask(state, action: PayloadAction<SubTask>) {
      if (state.task) {
        state.task.subTasks = [...(state.task.subTasks || []), action.payload];
      }
    },
    updateSubtask(state, action: PayloadAction<SubTask>) {
      if (state.task) {
        const index = state.task.subTasks?.findIndex(
          (subtask) => subtask._id === action.payload._id
        );
        if (index !== undefined && index !== -1) {
          state.task.subTasks![index] = action.payload;
        }
      }
    },
    deleteSubtask(state, action: PayloadAction<string>) {
      if (state.task) {
        state.task.subTasks = state.task.subTasks?.filter(
          (subtask) => subtask._id !== action.payload
        );
      }
    },
  },
});

export const {
  setTasks,
  setFilteredTasks,
  setLoading,
  setError,
  setCurrentPage,
  setStatusFilter,
  setPriorityFilter,
  setSearchQuery,
  setTotalTasks,
  setTask,
  addTask,
  updateTask,
  deleteTask,
  addSubtask,
  updateSubtask,
  deleteSubtask,
} = taskSlice.actions;

export default taskSlice.reducer;
