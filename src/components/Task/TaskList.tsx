// src/components/TaskList.tsx
import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../../types/taskTypes";
import { fetchTasks } from "../../api/taskService";
import TaskForm from "./TaskForm";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    loadTasks();
  }, []);

  const handleTaskSave = (task: Task) => {
    if (editingTask) {
      // Edit the task
      const updatedTasks = tasks.map((t) => (t._id === task._id ? task : t));
      setTasks(updatedTasks);
    } else {
      // Create new task
      setTasks([...tasks, task]);
    }
    setShowTaskForm(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <button
        onClick={() => setShowTaskForm(true)}
        className="bg-green-500 text-white px-6 py-2 rounded-lg mb-6"
      >
        + Add New Task
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onEdit={handleEditTask} />
        ))}
      </div>

      {showTaskForm && (
        <TaskForm task={editingTask} onSave={handleTaskSave} />
      )}
    </div>
  );
};

export default TaskList;
