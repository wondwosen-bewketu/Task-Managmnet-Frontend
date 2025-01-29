import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  createTask,
} from "../services";
import { Task } from "../types";

interface TaskContextType {
  tasks: Task[];
  task: Task | null;
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  statusFilter: string;
  priorityFilter: string;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  handleAddTask: (newTask: Task) => Promise<void>;
  handleUpdateTask: (updatedTask: Task) => Promise<void>;
  handleDeleteTask: (taskId: string) => Promise<void>;
  handleUpdateTaskStatus: (taskId: string, newStatus: string) => Promise<void>;
  loadTasks: () => Promise<void>;
  handlePageChange: (pageNumber: number) => void;
  setStatusFilter: (filter: string) => void;
  setPriorityFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const tasksPerPage = 9;

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTasks(currentPage, tasksPerPage);
      if (response && response.tasks) {
        setTasks(response.tasks);
        setTotalTasks(response.total);
      } else {
        setTasks([]);
      }
    } catch {
      setError("Oops! Something went wrong while loading tasks.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesStatus && matchesPriority && matchesSearch;
    });
    setFilteredTasks(filtered);
  }, [tasks, statusFilter, priorityFilter, searchQuery]);

  const handleAddTask = async (newTask: Task) => {
    try {
      setLoading(true);
      const createdTask = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch {
      setError("Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    if (updatedTask._id) {
      try {
        const result = await updateTask(updatedTask._id, updatedTask);
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === result._id ? result : t))
        );
        setTask(result);
      } catch {
        setError("Failed to update task.");
      }
    }
  };
  const handleDeleteTask = async (taskId: string) => {
    setError(null); 
    try {
      await deleteTask(taskId);

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to delete task:", error.message);
        setError("Failed to delete task. Please try again.");
      }
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === taskId ? updatedTask : t))
      );
      setTask(updatedTask);
    } catch {
      setError("Failed to update task status.");
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        task,
        filteredTasks,
        loading,
        error,
        statusFilter,
        priorityFilter,
        searchQuery,
        currentPage,
        totalPages,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
        handleUpdateTaskStatus,
        loadTasks,
        handlePageChange,
        setStatusFilter,
        setPriorityFilter,
        setSearchQuery,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
