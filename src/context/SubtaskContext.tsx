import React, { createContext, useContext, useState } from "react";
import { addSubtask, deleteSubtask, updateSubtask } from "../services";
import { SubTask } from "../types/taskTypes";

interface SubtaskContextType {
  subtasks: SubTask[];
  handleAddSubtask: (subtask: SubTask) => Promise<void>;
  handleUpdateSubtask: (updatedSubtask: SubTask) => Promise<void>;
  handleDeleteSubtask: (subtaskId: string) => Promise<void>;
}

const SubtaskContext = createContext<SubtaskContextType | undefined>(undefined);

interface SubtaskProviderProps {
  children: React.ReactNode;
}

export const SubtaskProvider = ({ children }: SubtaskProviderProps) => {
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);

  const handleAddSubtask = async (subtask: SubTask) => {
    try {
      const addedSubtask = await addSubtask(subtask);
      setSubtasks((prevSubtasks) => [...prevSubtasks, addedSubtask]);
      window.location.reload();
    } catch (error) {
      console.error("Failed to add subtask:", error);
    }
  };

  const handleUpdateSubtask = async (updatedSubtask: SubTask) => {
    try {
      const updated = await updateSubtask(updatedSubtask._id!, updatedSubtask);
      setSubtasks((prevSubtasks) =>
        prevSubtasks.map((subtask) =>
          subtask._id === updated._id ? updated : subtask
        )
      );
    } catch (error) {
      console.error("Failed to update subtask:", error);
    }
  };

  const handleDeleteSubtask = async (subtaskId: string) => {
    try {
      await deleteSubtask(subtaskId);
      setSubtasks((prevSubtasks) =>
        prevSubtasks.filter((subtask) => subtask._id !== subtaskId)
      );
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete subtask:", error);
    }
  };

  return (
    <SubtaskContext.Provider
      value={{
        subtasks,
        handleAddSubtask,
        handleUpdateSubtask,
        handleDeleteSubtask,
      }}
    >
      {children}
    </SubtaskContext.Provider>
  );
};

export const useSubtask = () => {
  const context = useContext(SubtaskContext);
  if (!context) {
    throw new Error("useSubtask must be used within a SubtaskProvider");
  }
  return context;
};
