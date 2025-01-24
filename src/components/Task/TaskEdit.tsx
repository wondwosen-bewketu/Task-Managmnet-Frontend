import React, { useState } from "react";
import { toast } from "react-toastify";
import { Task } from "../../types/taskTypes";
import Button from "../UI/Button";
import { Status, TaskPriority } from "../../types";
import InputField from "../UI/InputField"; // Import reusable InputField

interface TaskEditProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onClose: () => void;
}

const TaskEdit = ({ task, onUpdate, onClose }: TaskEditProps) => {
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
    toast.success("Task updated successfully!");
    onClose();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <InputField
          id="title"
          label="Title"
          name="title" // Add name
          value={editedTask.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
        />

        <InputField
          id="description"
          label="Description"
          name="description" // Add name
          value={editedTask.description}
          onChange={handleChange}
          placeholder="Enter task description"
          type="textarea"
          rows={4}
          required
        />

        {/* Status Field */}
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
            {Object.values(Status).map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Field */}
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
            {Object.values(TaskPriority).map((priorityOption) => (
              <option key={priorityOption} value={priorityOption}>
                {priorityOption.charAt(0).toUpperCase() +
                  priorityOption.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            onClick={onClose}
            text="Cancel"
            className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          />

          <Button
            onClick={handleSubmit}
            text="Update Task"
            type="submit"
            className="py-2 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          />
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;
