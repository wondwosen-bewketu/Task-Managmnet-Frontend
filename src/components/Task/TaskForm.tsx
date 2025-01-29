import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../UI/Button";
import { Status, Task, TaskPriority } from "../../types";
import InputField from "../UI/InputField";

interface TaskFormProps {
  onSubmit: (newTask: Task) => Promise<void>;
  closeModal: () => void;
}

const TaskForm = ({ closeModal, onSubmit }: TaskFormProps) => {
  // Include onSubmit prop here
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.Pending);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.High);

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
      await onSubmit(newTask); // Call the onSubmit prop
      toast.success("Task created successfully!");
      closeModal();
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error("Failed to create task.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
        {/* Description Field */}
        <InputField
          id="description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          type="textarea"
          rows={4}
          required
        />

        {/* Status & Priority Fields */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Status */}
          <InputField
            id="status"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            type="select"
            options={Object.values(Status)}
            required
          />

          {/* Priority */}
          <InputField
            id="priority"
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            type="select"
            options={Object.values(TaskPriority)}
            required
          />
        </div>
        <Button
          type="submit"
          text="Create Task"
          className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        />
      </form>
    </div>
  );
};

export default TaskForm;
