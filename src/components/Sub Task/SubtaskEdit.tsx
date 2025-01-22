import { useState, useEffect } from "react";
import { SubTask } from "../../types/taskTypes";

type SubTaskEditProps = {
  subtask: SubTask | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedSubtask: SubTask) => void;
};

const SubTaskEdit = ({
  subtask,
  isOpen,
  onClose,
  onSubmit,
}: SubTaskEditProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // If a subtask is passed in, update the input fields accordingly
  useEffect(() => {
    if (subtask) {
      setTitle(subtask.title);
      setDescription(subtask.description);
    }
  }, [subtask]);

  const handleSubmit = () => {
    if (title.trim() && description.trim()) {
      // Only submit if the subtask exists and title/description are non-empty
      if (subtask) {
        onSubmit({
          ...subtask,
          title,
          description,
        });
        onClose(); // Close the modal after submitting
      }
    }
  };

  // Don't render modal if not open or subtask is null
  if (!isOpen || !subtask) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-6">Edit Subtask</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubTaskEdit;
