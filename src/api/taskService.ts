import apiClient from "../services/apiClient"; // Import the configured Axios client
import { Task, SubTask } from "../types/taskTypes"; // Import Task type to ensure type safety

// Fetch paginated tasks
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
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response = await apiClient.post("/tasks", task);
    return response.data; // Return the created task data
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Could not create task");
  }
};

export const updateTask = async (
  id: string,
  updatedTask: Task
): Promise<Task> => {
  const response = await apiClient.put(`/tasks/${id}`, updatedTask);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/tasks/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Could not delete task");
  }
};

export const addSubtask = async (subtask: {
  title: string;
  description: string;
  status: string;
  parentTask: string;
}) => {
  try {
    console.log("Subtask data being sent:", JSON.stringify(subtask));
    const response = await apiClient.post("/subtasks", subtask);
    return response.data; // Return the server's response
  } catch (error) {
    console.error("Error creating subtask:", error);
    throw new Error("Error creating subtask");
  }
};

// Update a subtask
export const updateSubtask = async (
  id: string,
  updatedSubtask: SubTask
): Promise<SubTask> => {
  try {
    const response = await apiClient.put(`subtasks/${id}`, updatedSubtask);
    return response.data;
  } catch (error) {
    console.error("Error updating subtask:", error);
    throw new Error("Could not update subtask");
  }
};

// Delete a subtask
export const deleteSubtask = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/subtasks/${id}`);
  } catch (error) {
    console.error("Error deleting subtask:", error);
    throw new Error("Could not delete subtask");
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
