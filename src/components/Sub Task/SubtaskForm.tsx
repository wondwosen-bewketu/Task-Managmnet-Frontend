import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { addSubtask } from "../../api/taskService"; // Import the addSubtask function
import { SubTask } from "../../types/taskTypes";
import { toast } from "react-toastify"; // Import toast for notifications

interface SubtaskFormProps {
  taskId: string; // Pass the taskId (parentTask) as a prop to create a subtask for this task
  onSubmit: (subtaskId: string) => void;
  onClose: () => void;
}

const SubtaskForm = ({ taskId, onSubmit, onClose }: SubtaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "pending" | "inprogress" | "completed" | "cancelled"
  >("pending");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const newSubtask: SubTask = {
      title,
      description,
      status,
      parentTask: taskId, // The taskId is passed as parentTask
    };

    try {
      // Call the addSubtask API function
      const response = await addSubtask(newSubtask);

      if (response && response._id) {
        onSubmit(response._id); // After creating, call onSubmit with the new subtask ID
        onClose(); // Close the modal after submitting
        toast.success("Subtask successfully created!"); // Display success toast
      } else {
        toast.error("Failed to create subtask. Please try again."); // Display error toast
      }
    } catch {
      toast.error("Failed to create subtask. Please try again."); // Display error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 mt-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-3 mt-2 border rounded-lg"
        />
      </div>
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

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="py-2 px-4 bg-gray-300 rounded-lg text-gray-800 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"} <FaSave className="inline ml-2" />
        </button>
      </div>
    </form>
  );
};

export default SubtaskForm;
