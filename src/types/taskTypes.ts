// src/types/taskTypes.ts
export interface SubTask {
  title: string;
  description: string;
  status: string;
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: string;
  priority?: string;
  subTasks?: SubTask[];
  attachments?: string[];
  createdAt?: string;
  updatedAt?: string;
}
