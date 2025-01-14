// src/api/taskService.ts
import axios from "axios";
import { Task } from "../types/taskTypes";

const API_BASE_URL = "http://localhost:3000"; // Replace with your API URL

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

export const createTask = async (task: Task): Promise<Task> => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, task);
  return response.data;
};

export const uploadFile = async (taskId: string, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);
  await axios.post(`${API_BASE_URL}/tasks/${taskId}/upload`, formData);
};
