import { useParams } from "react-router-dom";
import TaskModals from "./TaskModals";
import TaskHeader from "./TaskHeader";
import FilesAndSubtasks from "../File/FilesAndSubtasks";
import useTask from "../../hooks/useTask";
import { useState } from "react";
import { SubTask } from "../../types";

const TaskDetail = () => {
  const { id } = useParams<string>();
  const {
    task,
    error,
    loading,
    handleUpdateTask,
    handleAddSubtask,
    handleUpdateSubtask,
    handleDeleteSubtask,
    handleDeleteTask,
    handleUpdateTaskStatus,
  } = useTask(id);

  const [modalState, setModalState] = useState({
    isSubtaskModalOpen: false,
    isEditModalOpen: false,
    isEditSubTaskModalOpen: false,
    isDeleteModalOpen: false,
  });
  const [currentSubtask, setCurrentSubtask] = useState<SubTask | null>(null);

  const openModal = (modalType: string) =>
    setModalState({ ...modalState, [modalType]: true });
  const closeModal = (modalType: string) =>
    setModalState({ ...modalState, [modalType]: false });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading task details...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
        {error}
      </div>
    );

  if (!task)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Task not found.
      </div>
    );

  return (
    <div>
      <TaskHeader
        task={task}
        onUpdateTaskStatus={handleUpdateTaskStatus}
        onGoBack={() => window.history.back()}
        onEditTask={() => openModal("isEditModalOpen")}
        onDeleteTask={() => openModal("isDeleteModalOpen")}
        onAddSubtask={() => openModal("isSubtaskModalOpen")}
      />

      {task._id && (
        <FilesAndSubtasks
          subtasks={task.subTasks || []}
          taskId={task._id}
          onEditSubtask={(subtask) => {
            setCurrentSubtask(subtask);
            openModal("isEditSubTaskModalOpen");
          }}
          onDeleteSubtask={handleDeleteSubtask}
        />
      )}

      <TaskModals
        modalState={modalState}
        task={task}
        currentSubtask={currentSubtask}
        closeModal={closeModal}
        handleUpdateTask={handleUpdateTask}
        handleAddSubtask={handleAddSubtask}
        handleUpdateSubtask={handleUpdateSubtask}
        handleDeleteTask={handleDeleteTask}
        handleDeleteSubtask={handleDeleteSubtask}
      />
    </div>
  );
};

export default TaskDetail;
