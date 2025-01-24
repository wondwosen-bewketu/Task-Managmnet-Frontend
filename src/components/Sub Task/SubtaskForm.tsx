import React, { useEffect } from "react";
import { SubTask, Status } from "../../types";
import Button from "../UI/Button";
import InputField from "../UI/InputField";
import { useSubtask } from "../../hooks/useSubtask"; // Assuming this is the correct import path

interface SubtaskFormProps {
  taskId: string;
  onSubmit: (subtask: SubTask) => void;
  onClose: () => void;
  subtask?: SubTask | null;
}

const SubtaskForm = ({
  taskId,
  subtask,
  onSubmit,
  onClose,
}: SubtaskFormProps) => {
  // Using the useSubtask hook
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
  } = useSubtask(taskId, subtask);

  useEffect(() => {
    if (subtask) {
      setTitle(subtask.title);
      setDescription(subtask.description);
      setStatus(subtask.status);
    }
  }, [subtask, setTitle, setDescription, setStatus]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSubtask = await handleSubmit(); // Calls the handleSubmit from the hook
    if (newSubtask) {
      onSubmit(newSubtask);
      onClose();
    }
  };

  return (
    <form onSubmit={onFormSubmit} className="space-y-6">
      {/* Title Field */}
      <InputField
        id="title"
        label="Title"
        value={title}
        onChange={handleChange} // Pass handleChange here
        placeholder="Enter subtask title"
        required
      />

      {/* Description Field */}
      <InputField
        id="description"
        label="Description"
        value={description}
        onChange={handleChange} // Pass handleChange here
        placeholder="Enter subtask description"
        type="textarea"
        rows={4}
        required
      />

      {/* Status Field */}
      <InputField
        id="status"
        label="Status"
        value={status}
        onChange={handleChange} // Pass handleChange here
        type="select"
        options={Object.values(Status)}
        required
      />

      <div className="flex justify-end space-x-4">
        <Button
          onClick={onClose}
          text="Cancel"
          className="py-2 px-4 bg-gray-300 rounded-lg text-gray-800 hover:bg-gray-400"
        />
        <Button
          type="submit"
          onClick={onFormSubmit} // Add onClick handler
          text={loading ? "Saving..." : "Save"}
          className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg disabled:opacity-50"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default SubtaskForm;
