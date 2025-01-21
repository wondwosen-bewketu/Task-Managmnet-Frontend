import React from "react";
import TaskModal from "../UI/Modal";
import TaskEdit from "./TaskEdit";
import SubtaskEdit from "../Sub Task/SubtaskEdit";
import SubtaskForm from "../Sub Task/SubtaskForm";
import DeleteTaskForm from "./DeleteTaskForm";
import { Task, SubTask } from "../../types/taskTypes";

interface TaskModalsProps {
  modalState: {
    isSubtaskModalOpen: boolean;
    isEditModalOpen: boolean;
    isEditSubTaskModalOpen: boolean;
    isDeleteModalOpen: boolean;
  };
  task: Task | null;
  subtask: SubTask | null;
  currentSubtask: SubTask | null;
  closeModal: (modalType: string) => void;
  handleUpdateTask: (updatedTask: Task) => void;
  handleUpdateSubtask: (updatedSubtask: SubTask) => void;
  handleDeleteSubtask: (subTaskId: string) => void;
  handleAddSubtask: (subtask: SubTask) => void;
  handleDeleteTask: (taskId: string) => void;
}

const TaskModals: React.FC<TaskModalsProps> = ({
  modalState,
  task,
  subtask,
  currentSubtask,
  closeModal,
  handleUpdateTask,
  handleAddSubtask,
  handleDeleteTask,
  handleUpdateSubtask,
}) => {
  return (
    <>
      {/* Edit Task Modal */}
      {modalState.isEditModalOpen && task && (
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

      {/* Edit Sub Task Modal */}
      {modalState.isEditSubTaskModalOpen && currentSubtask && (
        <TaskModal
          isOpen={modalState.isEditSubTaskModalOpen}
          onClose={() => closeModal("isEditSubTaskModalOpen")}
          title="Edit Sub Task"
        >
          <SubtaskEdit
            subtask={currentSubtask}
            onUpdate={handleUpdateSubtask}
            onClose={() => closeModal("isEditSubTaskModalOpen")}
          />
        </TaskModal>
      )}

      {/* Create Subtask Modal */}
      {modalState.isSubtaskModalOpen && !currentSubtask && task && (
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

      {/* Edit Subtask Modal (using currentSubtask for editing) */}
      {modalState.isSubtaskModalOpen && currentSubtask && task && (
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

      {/* Delete Task Modal */}
      {modalState.isDeleteModalOpen && task && (
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
