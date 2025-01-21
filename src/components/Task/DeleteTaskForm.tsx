import { toast } from "react-toastify";

interface DeleteTaskFormProps {
  taskId: string;
  onClose: () => void;
  onDelete: (taskId: string) => void;
}

const DeleteTaskForm = ({ taskId, onClose, onDelete }: DeleteTaskFormProps) => {
  const handleDelete = () => {
    onDelete(taskId); // Perform deletion logic
    toast.success("Task deleted successfully!"); // Show success toast
    onClose(); // Close the modal/form after deletion
  };

  return (
    <div className="text-center">
      <div className="space-x-4">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
          onClick={handleDelete}
        >
          Yes, Delete
        </button>
        <button
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteTaskForm;
