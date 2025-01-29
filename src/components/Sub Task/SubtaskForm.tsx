import React, { useState } from "react";
import { SubTask, Status } from "../../types";
import Button from "../UI/Button"; // Assuming you have the Button component

interface SubtaskFormProps {
  taskId: string;
  onSubmit: (subtask: SubTask) => void;
  onClose: () => void;
}

const SubtaskForm = ({ taskId, onSubmit, onClose }: SubtaskFormProps) => {
  const [formData, setFormData] = useState<SubTask>({
    title: "",
    description: "",
    status: Status.Pending,
    parentTask: taskId,
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value as Status,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    try {
      await onSubmit(formData); // Submit the form
    } catch (error) {
      console.error("Error adding subtask", error);
    } finally {
      setIsSubmitting(false); // Reset submitting state after the process
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full py-2 px-4 bg-white border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full py-2 px-4 bg-white border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleStatusChange}
          className="w-full py-2 px-4 bg-white border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value={Status.Pending}>Pending</option>
          <option value={Status.InProgress}>In Progress</option>
          <option value={Status.Completed}>Completed</option>
          <option value={Status.Cancelled}>Cancelled</option>
        </select>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={onClose}
          text="Cancel"
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          text={isSubmitting ? "Adding Subtask..." : "Add Subtask"} // Change label based on submitting state
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={isSubmitting} // Disable button during submission
        />
      </div>
    </form>
  );
};

export default SubtaskForm;
