import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTaskById,
  updateTask,
  deleteTask,
  addSubtask,
  updateSubtask,
  deleteSubtask,
  updateTaskStatus,
} from "../../api/taskService";
import TaskModals from "./TaskModals";
import TaskHeader from "./TaskHeader";
import FilesAndSubtasks from "../File/FilesAndSubtasks";
import { Task, SubTask } from "../../types/taskTypes";

const TaskDetail = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalState, setModalState] = useState({
    isSubtaskModalOpen: false,
    isEditModalOpen: false,
    isEditSubTaskModalOpen: false,
    isDeleteModalOpen: false,
  });
  const [currentSubtask, setCurrentSubtask] = useState<SubTask | null>(null);

  // Modal state handlers
  const openModal = (modalType: string) =>
    setModalState({ ...modalState, [modalType]: true });
  const closeModal = (modalType: string) =>
    setModalState({ ...modalState, [modalType]: false });

  // Fetch task details
  useEffect(() => {
    const loadTask = async () => {
      if (!id) {
        setError("Task ID is missing in the URL.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedTask = await getTaskById(id);
        setTask(fetchedTask);
      } catch (err) {
        setError("Failed to load task details.");
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  // Task operations
  const handleUpdateTask = async (updatedTask: Task) => {
    if (id) {
      const result = await updateTask(id, updatedTask);
      setTask(result);
      closeModal("isEditModalOpen");
    }
  };

  const handleAddSubtask = async (subtask: SubTask) => {
    if (id) {
      try {
        await addSubtask({ ...subtask, parentTask: id });
        closeModal("isSubtaskModalOpen");
        const updatedTask = await getTaskById(id);
        setTask(updatedTask);
      } catch (err) {
        console.error("Failed to add subtask:", err);
      }
    }
  };

  const handleUpdateSubtask = async (updatedSubTask: SubTask) => {
    if (id) {
      const result = await updateSubtask(id, updatedSubTask);
      setCurrentSubtask(result);
      closeModal("isEditSubTaskModalOpen");
    }
  };

  const handleDeleteSubtask = async (subTaskId: string) => {
    if (id) {
      try {
        await deleteSubtask(id, subTaskId);
        const updatedTask = await getTaskById(id);
        setTask(updatedTask);
      } catch {
        setError("Failed to delete subtask.");
      }
    }
  };

  const handleDeleteTask = async () => {
    if (id) {
      try {
        await deleteTask(id);
        navigate("/");
      } catch {
        setError("Failed to delete task.");
      }
    }
  };

  const handleUpdateTaskStatus = async (newStatus: string) => {
    if (id) {
      try {
        const updatedTask = await updateTaskStatus(id, newStatus);
        setTask(updatedTask);
      } catch (err) {
        setError("Failed to update task status.");
        console.error(err);
      }
    }
  };

  const handleGoBack = () => navigate(-1);

  // Conditional rendering for loading or error states
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
      {/* Task Header */}
      <TaskHeader
        task={task}
        onUpdateTaskStatus={handleUpdateTaskStatus}
        onGoBack={handleGoBack}
        onEditTask={() => openModal("isEditModalOpen")}
        onDeleteTask={() => openModal("isDeleteModalOpen")}
        onAddSubtask={() => openModal("isSubtaskModalOpen")}
      />

      {/* Subtasks and Files */}
      <FilesAndSubtasks
        subtasks={task.subTasks || []}
        taskId={task._id}
        onEditSubtask={(subtask) => {
          setCurrentSubtask(subtask);
          openModal("isEditSubTaskModalOpen");
        }}
        onDeleteSubtask={handleDeleteSubtask}
      />

      {/* Modals */}
      <TaskModals
        modalState={modalState}
        task={task}
        currentSubtask={currentSubtask}
        closeModal={closeModal}
        handleUpdateTask={handleUpdateTask}
        handleAddSubtask={handleAddSubtask}
        handleUpdateSubtask={handleUpdateSubtask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskDetail;
