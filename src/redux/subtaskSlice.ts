// src/store/subtaskSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubTask } from "../types/taskTypes";

interface SubtaskState {
  currentSubtask: SubTask | null;
  modalState: {
    isSubtaskModalOpen: boolean;
    isDeleteModalOpen: boolean;
  };
}

const initialState: SubtaskState = {
  currentSubtask: null,
  modalState: {
    isSubtaskModalOpen: false,
    isDeleteModalOpen: false,
  },
};

export const subtaskSlice = createSlice({
  name: "subtask",
  initialState,
  reducers: {
    openSubtaskModal: (state) => {
      state.modalState.isSubtaskModalOpen = true;
    },
    closeSubtaskModal: (state) => {
      state.modalState.isSubtaskModalOpen = false;
    },
    openDeleteModal: (state) => {
      state.modalState.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.modalState.isDeleteModalOpen = false;
    },
    setCurrentSubtask: (state, action: PayloadAction<SubTask>) => {
      state.currentSubtask = action.payload;
    },
    removeCurrentSubtask: (state) => {
      state.currentSubtask = null;
    },
  },
});

export const {
  openSubtaskModal,
  closeSubtaskModal,
  openDeleteModal,
  closeDeleteModal,
  setCurrentSubtask,
  removeCurrentSubtask,
} = subtaskSlice.actions;
export default subtaskSlice.reducer;
