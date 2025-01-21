import React, { useState } from "react";
import { Task } from "../../types/taskTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TaskEditProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onClose: () => void;
}

const TaskEdit: React.FC<TaskEditProps> = ({ task, onUpdate, onClose }) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedTask);
    toast.success("Task updated successfully!"); // Success toast notification
    onClose(); // Automatically close modal after update
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-800" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
            required
          />
        </div>

        <div>
          <label
            className="block font-semibold text-gray-800"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label
            className="block font-semibold text-gray-800"
            htmlFor="priority"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Update Task
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskEdit;
