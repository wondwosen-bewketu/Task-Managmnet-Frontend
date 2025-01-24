import { Task } from "../../types/taskTypes";
import Button from "../UI/Button";
import { SubTask } from "../../types/taskTypes";

interface TaskActionsProps {
  task: Task | null;
  modalState: {
    isSubtaskModalOpen: boolean;
    isEditModalOpen: boolean;
    isEditSubTaskModalOpen: boolean;
    isDeleteModalOpen: boolean;
  };
  setModalState: (state: {
    isSubtaskModalOpen: boolean;
    isEditModalOpen: boolean;
    isEditSubTaskModalOpen: boolean;
    isDeleteModalOpen: boolean;
  }) => void;
  setSubtask: (value: SubTask | null) => void;
  setCurrentSubtask: (value: SubTask | null) => void;
}

const TaskActions = ({
  modalState,
  setModalState,
  setSubtask,
}: TaskActionsProps) => {
  const openModal = (modalType: string) => {
    setModalState({ ...modalState, [modalType]: true });
  };

  const handleAddSubtask = () => {
    setSubtask(null);
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
      <Button
        onClick={handleEditTask}
        text="Edit Task"
        className="bg-gradient-to-r from-blue-500 to-indigo-600"
      />

      <Button
        onClick={handleDeleteTask}
        text="Delete Task"
        className="bg-gradient-to-r from-red-500 to-pink-500"
      />

      <Button
        onClick={handleAddSubtask}
        text="Add Subtask"
        className="bg-gradient-to-r from-purple-500 to-pink-600"
      />
    </div>
  );
};

export default TaskActions;
