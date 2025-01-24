import { toast } from "react-toastify";
import Button from "../UI/Button";

interface DeleteTaskFormProps {
  taskId: string;
  onClose: () => void;
  onDelete: (taskId: string) => void;
}

const DeleteTaskForm = ({ taskId, onClose, onDelete }: DeleteTaskFormProps) => {
  const handleDelete = () => {
    onDelete(taskId);
    toast.success("Task deleted successfully!");
    onClose();
  };

  return (
    <div className="text-center">
      <div className="space-x-4">
        <Button
          onClick={handleDelete}
          text="Yes, Delete"
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
        />
        <Button
          onClick={onClose}
          text="Cancel"
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        />
      </div>
    </div>
  );
};

export default DeleteTaskForm;
