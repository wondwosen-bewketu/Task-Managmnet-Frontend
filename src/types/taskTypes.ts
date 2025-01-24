import { Status } from "./statusTypes";
import { TaskPriority } from "./priorityTypes";

export interface SubTask {
  _id?: string;
  title: string;
  description: string;
  status: Status;
  parentTask?: string;
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: Status;
  priority: TaskPriority;
  subTasks?: SubTask[];
  attachments?: string[];
  createdAt?: string;
  updatedAt?: string;
}
