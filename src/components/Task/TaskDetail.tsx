import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTask, useSubtask } from "../../context";
import { SubTask, Task } from "../../types";
import TaskModals from "./TaskModals";
import TaskHeader from "./TaskHeader";
import FilesAndSubtasks from "../File/FilesAndSubtasks";

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>(); // id may be undefined
  const {
    tasks,
    error,
    loading,
    handleUpdateTask,
    handleDeleteTask,
    handleUpdateTaskStatus,
  } = useTask();
  const { handleAddSubtask, handleUpdateSubtask, handleDeleteSubtask } =
    useSubtask();

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      const fetchedTask = tasks.find((t) => t._id === id) || null;
      setTask(fetchedTask);
    } else {
      // Handle the case when id is undefined
      console.error("Task ID is missing");
      // You can also redirect or show an error UI if needed
    }
  }, [tasks, id]);

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

  const handleUpdateSubtaskAndUpdateState = async (subtask: SubTask) => {
    try {
      await handleUpdateSubtask(subtask);
      const updatedSubtasks = (task?.subTasks || []).map((s) =>
        s._id === subtask._id ? subtask : s
      );
      updateSubtasksState(updatedSubtasks);
      closeModal("isEditSubTaskModalOpen");
    } catch (err) {
      console.error("Error updating subtask", err);
    }
  };

  const handleAddSubtaskAndUpdateState = async (subtask: SubTask) => {
    try {
      await handleAddSubtask(subtask);
      updateSubtasksState([...(task?.subTasks || []), subtask]);
      closeModal("isSubtaskModalOpen");
    } catch (err) {
      console.error("Error adding subtask", err);
    }
  };

  const updateSubtasksState = (subtasks: SubTask[]) => {
    setTask((prevTask) =>
      prevTask ? { ...prevTask, subTasks: subtasks } : null
    );
  };

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
        onUpdateTaskStatus={(status) => {
          if (task._id) {
            handleUpdateTaskStatus(task._id, status);
          }
        }}
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
          onDeleteSubtask={(subtaskId) => handleDeleteSubtask(subtaskId)}
        />
      )}

      <TaskModals
        modalState={modalState}
        task={task}
        currentSubtask={currentSubtask}
        closeModal={closeModal}
        handleUpdateTask={handleUpdateTask}
        handleAddSubtask={handleAddSubtaskAndUpdateState}
        handleUpdateSubtask={handleUpdateSubtaskAndUpdateState}
        handleDeleteTask={() => {
          if (task._id) {
            handleDeleteTask(task._id);
          }
        }}
        handleDeleteSubtask={handleDeleteSubtask}
      />
    </div>
  );
};

export default TaskDetail;
