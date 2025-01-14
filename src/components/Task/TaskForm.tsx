import React, { useState } from "react";
import FileUpload from "../File/FileUpload";
import { Task } from "../../types/taskTypes";

const TaskForm: React.FC = () => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    status: "",
    attachments: [],
  });

  // Handle files passed from FileUpload component
  const handleFilesChange = (files: File[]) => {
    setTask({
      ...task,
      attachments: files.map((file) => file.name), // Save file names to the task
    });
  };

  // Handle task form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Task submitted:", task);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold">Task Title</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full p-2 border"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">Description</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full p-2 border"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">Status</label>
        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          className="w-full p-2 border"
          required
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* File upload section */}
      <FileUpload onFilesChange={handleFilesChange} />

      <button type="submit" className="w-full p-2 bg-blue-500 text-white mt-4">
        Submit Task
      </button>
    </form>
  );
};

export default TaskForm;
