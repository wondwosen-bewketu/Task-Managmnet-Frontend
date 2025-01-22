import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";
import SearchBar from "./SearchFilter";
import { Task } from "../../types/taskTypes";
import { getTasks } from "../../api/taskService";
import TaskModal from "../UI/Modal";
import TaskForm from "./TaskForm";

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getTasks();
        // Ensure you access the 'tasks' array in the response
        if (response && response.tasks) {
          setTasks(response.tasks);
        } else {
          setTasks([]);
        }
      } catch {
        setError("Oops! Something went wrong while loading tasks.");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      const filtered = tasks.filter((task) => {
        const matchesSearch = task.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || task.status === statusFilter;
        return matchesSearch && matchesStatus;
      });
      setFilteredTasks(filtered);
    }
  }, [tasks, searchQuery, statusFilter]);

  const handleAddTask = (data: Task) => {
    setTasks((prevTasks) => [...prevTasks, data]);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
        <p className="ml-4 text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Task Dashboard
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <SearchBar onSearch={setSearchQuery} />
        <TaskFilter onChange={setStatusFilter} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:scale-105 transition-transform"
        >
          Add Task
        </button>
      </div>

      <TaskList tasks={filteredTasks} />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleAddTask}
          closeModal={() => setIsModalOpen(false)}
        />
      </TaskModal>
    </div>
  );
};

export default TaskBoard;
