import apiClient from "../api/apiClient";
import { SubTask } from "../types/taskTypes";

export const addSubtask = async (subtask: {
  title: string;
  description: string;
  status: string;
  parentTask: string;
}) => {
  try {
    console.log("Subtask data being sent:", JSON.stringify(subtask));
    const response = await apiClient.post("/subtasks", subtask);
    return response.data;
  } catch (error) {
    console.error("Error creating subtask:", error);
    throw new Error("Error creating subtask");
  }
};

export const updateSubtask = async (
  id: string,
  updatedSubtask: SubTask
): Promise<SubTask> => {
  try {
    const response = await apiClient.put(`/subtasks/${id}`, updatedSubtask);
    return response.data;
  } catch (error) {
    console.error("Error updating subtask:", error);
    throw new Error("Could not update subtask");
  }
};

export const deleteSubtask = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/subtasks/${id}`);
  } catch (error) {
    console.error("Error deleting subtask:", error);
    throw new Error("Could not delete subtask");
  }
};
