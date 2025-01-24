import apiClient from "../api/apiClient";
import { Task } from "../types/taskTypes";

export const getTasks = async (
  page: number,
  limit: number
): Promise<{ tasks: Task[]; total: number }> => {
  try {
    const response = await apiClient.get("/tasks", {
      params: { page, limit },
    });
    return {
      tasks: response.data.tasks,
      total: response.data.total,
    };
  } catch (error) {
    console.error("Error fetching paginated tasks:", error);
    throw new Error("Could not fetch tasks");
  }
};

export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw new Error("Could not fetch task");
  }
};

export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response = await apiClient.post("/tasks", task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Could not create task");
  }
};

export const updateTask = async (
  id: string,
  updatedTask: Task
): Promise<Task> => {
  try {
    const response = await apiClient.put(`/tasks/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Could not update task");
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/tasks/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Could not delete task");
  }
};

export const updateTaskStatus = async (
  taskId: string,
  status: string
): Promise<Task> => {
  try {
    const response = await apiClient.put(`/tasks/${taskId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw new Error("Could not update task status");
  }
};
