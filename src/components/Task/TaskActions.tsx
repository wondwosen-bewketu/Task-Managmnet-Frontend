import React from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Task } from "../../types/taskTypes";

interface TaskActionsProps {
  task: Task | null;
  modalState: {
    isSubtaskModalOpen: boolean;
    isEditModalOpen: boolean;
    isEditSubTaskModalOpen: boolean;
    isDeleteModalOpen: boolean;
  };
  setModalState: React.Dispatch<
    React.SetStateAction<{
      isSubtaskModalOpen: boolean;
      isEditModalOpen: boolean;
      isEditSubTaskModalOpen: boolean;
      isDeleteModalOpen: boolean;
    }>
  >;
  setSubtask: React.Dispatch<React.SetStateAction<any>>;
  setCurrentSubtask: React.Dispatch<React.SetStateAction<any>>;
}

const TaskActions: React.FC<TaskActionsProps> = ({
  task,
  modalState,
  setModalState,
  setSubtask,
  setCurrentSubtask,
}) => {
  const openModal = (modalType: string) => {
    setModalState({ ...modalState, [modalType]: true });
  };

  const handleAddSubtask = () => {
    setSubtask(null); // Reset current subtask when creating a new one
    openModal("isSubtaskModalOpen");
  };

  const handleEditTask = () => {
    openModal("isEditModalOpen");
  };

  const handleDeleteTask = () => {
    openModal("isDeleteModalOpen");
  };

  return (
    <div className="fixed top-1/2 right-8 transform -translate-y-1/2 flex flex-col items-center space-y-4 sm:space-y-6 z-50">
      {/* Edit Task Button */}
      <button
        className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-xl hover:scale-110 transition-transform"
        onClick={handleEditTask}
        title="Edit Task"
      >
        <FaEdit className="text-lg text-white" />
      </button>

      {/* Delete Task Button */}
      <button
        className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-xl hover:scale-110 transition-transform"
        onClick={handleDeleteTask}
        title="Delete Task"
      >
        <FaTrash className="text-lg text-white" />
      </button>

      {/* Add Subtask Button */}
      <button
        className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-xl hover:scale-110 transition-transform"
        onClick={handleAddSubtask}
        title="Add Subtask"
      >
        <FaPlus className="text-lg text-white" />
      </button>
    </div>
  );
};

export default TaskActions;
