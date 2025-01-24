import React, { useEffect } from "react";
import { SubTask, Status } from "../../types";
import Button from "../UI/Button";
import InputField from "../UI/InputField";
import { useSubtask } from "../../hooks/useSubtask"; // Assuming this is the correct import path

type SubtaskEditProps = {
  subtask: SubTask | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedSubtask: SubTask) => void;
};

const SubtaskEdit = ({
  subtask,
  isOpen,
  onClose,
  onSubmit,
}: SubtaskEditProps) => {
  const {
    title,
    description,
    status,
    loading,
    setTitle,
    setDescription,
    setStatus,
    handleSubmit,
    handleChange,
  } = useSubtask(subtask?.parentTask || "", subtask);

  useEffect(() => {
    if (subtask) {
      setTitle(subtask.title);
      setDescription(subtask.description);
      setStatus(subtask.status); // Sync the status if needed
    }
  }, [subtask, setTitle, setDescription, setStatus]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSubtask = await handleSubmit(); // Calls the handleSubmit from the hook
    if (updatedSubtask) {
      onSubmit(updatedSubtask);
      onClose();
    }
  };

  if (!isOpen || !subtask) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-6">Edit Subtask</h2>

        {/* Title Field */}
        <InputField
          id="title"
          label="Title"
          value={title}
          onChange={handleChange} // Using handleChange from the hook
          placeholder="Enter subtask title"
          required
        />

        {/* Description Field */}
        <InputField
          id="description"
          label="Description"
          value={description}
          onChange={handleChange} // Using handleChange from the hook
          placeholder="Enter subtask description"
          type="textarea"
          rows={4}
          required
        />

        {/* Status Field (optional if needed) */}
        <InputField
          id="status"
          label="Status"
          value={status}
          onChange={handleChange} // Using handleChange from the hook
          type="select"
          options={Object.values(Status)} // Assuming Status is an enum or array
          required
        />

        <div className="flex justify-end space-x-4 mt-4">
          <Button
            onClick={onClose}
            text="Cancel"
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
          />
          <Button
            onClick={onFormSubmit} // Add onClick to trigger submit
            text={loading ? "Saving..." : "Save"}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default SubtaskEdit;
