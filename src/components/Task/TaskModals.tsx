import TaskModal from "../UI/Modal";
import TaskEdit from "./TaskEdit";
import SubtaskForm from "../Sub Task/SubtaskForm";
import DeleteTaskForm from "./DeleteTaskForm";
import { Task, SubTask } from "../../types/taskTypes";

interface TaskModalsProps {
  modalState: {
    isSubtaskModalOpen: boolean;
    isEditModalOpen: boolean;
    isDeleteModalOpen: boolean;
  };
  task: Task | null;
  currentSubtask: SubTask | null;
  closeModal: (modalType: string) => void;
  handleUpdateTask: (updatedTask: Task) => void;
  handleDeleteSubtask: (subTaskId: string) => void;
  handleAddSubtask: (subtask: SubTask) => void;
  handleDeleteTask: (taskId: string) => void;
  handleUpdateSubtask: (subtask: SubTask) => void; // Add this handler
}

const TaskModals = ({
  modalState,
  task,
  currentSubtask,
  closeModal,
  handleUpdateTask,
  handleAddSubtask,
  handleDeleteTask,
  handleUpdateSubtask, // Pass this prop
}: TaskModalsProps) => {
  return (
    <>
      {modalState.isEditModalOpen && task && task._id && (
        <TaskModal
          isOpen={modalState.isEditModalOpen}
          onClose={() => closeModal("isEditModalOpen")}
          title="Edit Task"
        >
          <TaskEdit
            task={task}
            onUpdate={handleUpdateTask}
            onClose={() => closeModal("isEditModalOpen")}
          />
        </TaskModal>
      )}

      {modalState.isSubtaskModalOpen && !currentSubtask && task && task._id && (
        <TaskModal
          isOpen={modalState.isSubtaskModalOpen}
          onClose={() => closeModal("isSubtaskModalOpen")}
          title="Create Subtask"
        >
          <SubtaskForm
            taskId={task._id}
            onSubmit={handleAddSubtask}
            onClose={() => closeModal("isSubtaskModalOpen")}
          />
        </TaskModal>
      )}

      {modalState.isSubtaskModalOpen && currentSubtask && task && task._id && (
        <TaskModal
          isOpen={modalState.isSubtaskModalOpen}
          onClose={() => closeModal("isSubtaskModalOpen")}
          title="Edit Subtask"
        >
          <SubtaskForm
            taskId={task._id}
            subtask={currentSubtask}
            onSubmit={handleUpdateSubtask}
            onClose={() => closeModal("isSubtaskModalOpen")}
          />
        </TaskModal>
      )}

      {modalState.isDeleteModalOpen && task && task._id && (
        <TaskModal
          isOpen={modalState.isDeleteModalOpen}
          onClose={() => closeModal("isDeleteModalOpen")}
          title="Confirm Delete"
        >
          <DeleteTaskForm
            taskId={task._id}
            onClose={() => closeModal("isDeleteModalOpen")}
            onDelete={handleDeleteTask}
          />
        </TaskModal>
      )}
    </>
  );
};

export default TaskModals;
