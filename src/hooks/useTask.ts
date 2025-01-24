import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTaskById,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  addSubtask,
  updateSubtask,
  deleteSubtask,
  createTask,
} from "../services";
import { Task, SubTask } from "../types";

const useTask = (id?: string) => {
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
    if (id) {
      const loadTaskById = async () => {
        setLoading(true);
        try {
          const fetchedTask = await getTaskById(id);
          if (fetchedTask) {
            setTask(fetchedTask);
          } else {
            setError("Task not found.");
          }
        } catch {
          setError("Failed to load task details.");
        } finally {
          setLoading(false);
        }
      };
      loadTaskById(); // Load task by ID if provided
    } else {
      loadTasks(); // Load all tasks if no ID is provided
    }
  }, [id, loadTasks]); // Reload tasks when ID or loadTasks changes

  // Filtering tasks based on status, priority, and search query
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

  // Handle task creation
  const handleAddTask = async (newTask: Task) => {
    try {
      const createdTask = await createTask(newTask); // Call the service to add the task
      setTasks((prevTasks) => [...prevTasks, createdTask]); // Add task to the task list
    } catch {
      setError("Failed to add task.");
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    if (id) {
      try {
        const result = await updateTask(id, updatedTask);
        setTask(result); // Update the current task state
      } catch {
        setError("Failed to update task.");
      }
    }
  };

  const handleAddSubtask = async (subtask: SubTask) => {
    if (id) {
      try {
        await addSubtask({ ...subtask, parentTask: id });
        // No need to refetch the entire task, just add the subtask locally
        setTask((prevTask) =>
          prevTask
            ? {
                ...prevTask,
                subTasks: [...(prevTask.subTasks || []), subtask],
              }
            : prevTask
        );
      } catch {
        setError("Failed to add subtask.");
      }
    }
  };

  const handleUpdateSubtask = async (updatedSubtask: SubTask) => {
    if (id && updatedSubtask._id) {
      try {
        const result = await updateSubtask(id, updatedSubtask);
        setTask((prevTask) =>
          prevTask
            ? {
                ...prevTask,
                subTasks: prevTask.subTasks?.map((st) =>
                  st._id === updatedSubtask._id ? result : st
                ),
              }
            : null
        );
      } catch {
        setError("Failed to update subtask.");
      }
    }
  };

  const handleDeleteSubtask = async (subTaskId: string) => {
    if (id) {
      try {
        await deleteSubtask(subTaskId);
        setTask((prevTask) =>
          prevTask
            ? {
                ...prevTask,
                subTasks: prevTask.subTasks?.filter(
                  (st) => st._id !== subTaskId
                ),
              }
            : null
        );
      } catch {
        setError("Failed to delete subtask.");
      }
    }
  };

  const handleDeleteTask = async () => {
    if (id) {
      try {
        await deleteTask(id);
        navigate("/"); // Redirect to home after deleting the task
      } catch {
        setError("Failed to delete task.");
      }
    }
  };

  const handleUpdateTaskStatus = async (newStatus: string) => {
    if (id) {
      try {
        const updatedTask = await updateTaskStatus(id, newStatus);
        setTask(updatedTask);
      } catch {
        setError("Failed to update task status.");
      }
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return {
    tasks,
    filteredTasks,
    task,
    error,
    loading,
    totalPages,
    currentPage,
    handleAddTask,
    handleUpdateTask,
    handleAddSubtask,
    handleUpdateSubtask,
    handleDeleteSubtask,
    handleDeleteTask,
    handleUpdateTaskStatus,
    loadTasks,
    handlePageChange,
    setStatusFilter,
    setPriorityFilter,
    setSearchQuery,
  };
};

export default useTask;
