import React, { useState } from "react";
import { createTask } from "../../api/taskService";
import { Task } from "../../types/taskTypes";
const TaskForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<
    "pending" | "inprogress" | "completed" | "cancelled"
  >("pending");
  const [priority, setPriority] = useState<
    "low" | "medium" | "high" | "urgent" | "critical"
  >("high");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      title,
      description,
      status,
      priority,
      subTasks: [],
      attachments: [],
    };

    try {
      await createTask(newTask);
      setSuccess("Task created successfully!");
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority("high");
    } catch (err) {
      console.error(err);
      setError("Failed to create task.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        Create a New Task
      </h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && (
        <div className="text-green-500 text-center mb-4">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter task title"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter task description"
            rows={4}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "pending"
                    | "inprogress"
                    | "completed"
                    | "cancelled"
                )
              }
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="priority"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as
                    | "low"
                    | "medium"
                    | "high"
                    | "urgent"
                    | "critical"
                )
              }
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
