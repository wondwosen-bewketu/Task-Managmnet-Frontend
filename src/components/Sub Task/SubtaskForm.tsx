import React, { useState, useEffect } from "react";
import { SubTask, Status } from "../../types";

interface SubtaskFormProps {
  taskId: string;
  subtask?: SubTask;
  onSubmit: (subtask: SubTask) => void;
  onClose: () => void;
}

const SubtaskForm = ({
  taskId,
  subtask,
  onSubmit,
  onClose,
}: SubtaskFormProps) => {
  const [formData, setFormData] = useState<SubTask>({
    title: subtask?.title || "",
    description: subtask?.description || "",
    status: subtask?.status || Status.Pending,
    parentTask: taskId,
  });

  useEffect(() => {
    if (subtask) {
      setFormData({
        ...subtask,
        parentTask: taskId,
      });
    }
  }, [subtask, taskId]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {subtask ? "Update Subtask" : "Add Subtask"}
        </button>
      </div>
    </form>
  );
};

export default SubtaskForm;
