export interface SubTask {
  _id?: string; // Make _id optional
  title: string;
  description: string;
  status: "pending" | "inprogress" | "completed" | "cancelled";
  parentTask?: string;
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: "pending" | "inprogress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent" | "critical";
  subTasks?: SubTask[];
  attachments?: string[];
  createdAt?: string;
  updatedAt?: string;
}
