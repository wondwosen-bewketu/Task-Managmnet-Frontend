export interface SubTask {
  title: string;
  description: string;
  status: string;
}

export interface Task {
  title: string;
  description: string;
  status: "pending" | "inprogress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent" | "critical";
  subTasks?: SubTask[];
  attachments?: string[];
  createdAt?: string;
  updatedAt?: string;
}
