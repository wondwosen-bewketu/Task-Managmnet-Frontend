import apiClient from "../services/apiClient"; // Import the configured Axios client
import { Task } from "../types/taskTypes"; // Import Task type to ensure type safety

// Fetch all tasks
export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await apiClient.get("/tasks");
    return response.data; // Return the task data from the response
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Could not fetch tasks");
  }
};

// Fetch a single task by ID
export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data; // Return the task data for the specified ID
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw new Error("Could not fetch task by ID");
  }
};

// Change the function name from getTaskById to fetchTaskById in taskService.ts
export const fetchTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data; // Return the task data for the specified ID
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw new Error("Could not fetch task by ID");
  }
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

// Update an existing task
export const updateTask = async (id: string, task: Task): Promise<Task> => {
  try {
    const response = await apiClient.put(`/tasks/${id}`, task);
    return response.data; // Return the updated task data
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Could not update task");
  }
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
