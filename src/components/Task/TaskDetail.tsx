import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTaskById,
  updateTask,
  deleteSubtask,
  deleteTask,
  addSubtask,
  updateSubtask,
} from "../../api/taskService";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import TaskModals from "./TaskModals"; // Import TaskModals component
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
  const [subtask, setSubtask] = useState<SubTask | null>(null);

  const openModal = (modalType: string) =>
    setModalState({ ...modalState, [modalType]: true });
  const closeModal = (modalType: string) =>
    setModalState({ ...modalState, [modalType]: false });

  useEffect(() => {
    const loadTask = async () => {
      setLoading(true);
      setError(null);

      if (!id) {
        setError("Task ID is missing in the URL.");
        setLoading(false);
        return;
      }

      try {
        const fetchedTask = await getTaskById(id);
        setTask(fetchedTask);
      } catch {
        setError("Failed to load task details.");
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  const handleUpdateTask = async (updatedTask: Task) => {
    if (id) {
      const result = await updateTask(id, updatedTask);
      setTask(result);
      closeModal("isEditModalOpen");
    }
  };

  const handleUpdateSubtask = async (updatedSubTask: SubTask) => {
    if (id) {
      const result = await updateSubtask(id, updatedSubTask);
      setSubtask(result);
      closeModal("isEditSubTaskModalOpen");
    }
  };

  const handleDeleteTask = async () => {
    if (!id) return;

    try {
      await deleteTask(id);
      navigate("/");
    } catch {
      setError("Failed to delete task.");
    }
  };

  const handleAddSubtask = async (subtask: SubTask) => {
    if (!id) return;

    try {
      await addSubtask(subtask);
      closeModal("isSubtaskModalOpen");
      const updatedTask = await getTaskById(id);
      setTask(updatedTask);
    } catch {}
  };

  const handleDeleteSubtask = async (subTaskId: string) => {
    if (!id) return;

    try {
      await deleteSubtask(id, subTaskId);
      const updatedTask = await getTaskById(id); // Refresh task data
      setTask(updatedTask);
    } catch {
      setError("Failed to delete subtask.");
    }
  };

  const handleGoBack = () => navigate(-1);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-3xl font-bold text-gray-100 animate-pulse">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold text-red-600">
        {error}
      </div>
    );

  if (!task)
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-medium text-gray-300">
        Task not found.
      </div>
    );

  return (
    <div className="h-auto min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-auto">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-purple-800 to-black blur-3xl opacity-50 animate-pulse"></div>

      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 flex flex-col items-center space-y-4 sm:space-y-6 z-50">
        <button
          className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-xl hover:scale-110 transition-transform"
          onClick={() => openModal("isEditModalOpen")}
          title="Edit Task"
        >
          <FaEdit className="text-lg sm:text-xl md:text-2xl text-white group-hover:text-yellow-300 transition-colors" />
        </button>
        <button
          className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-xl hover:scale-110 transition-transform"
          onClick={() => openModal("isDeleteModalOpen")}
          title="Delete Task"
        >
          <FaTrash className="text-lg sm:text-xl md:text-2xl text-white group-hover:text-yellow-300 transition-colors" />
        </button>
        <button
          className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-xl hover:scale-110 transition-transform"
          onClick={() => openModal("isSubtaskModalOpen")}
          title="Add Subtask"
        >
          <FaPlus className="text-lg sm:text-xl md:text-2xl text-white group-hover:text-yellow-300 transition-colors" />
        </button>
      </div>

      <div className="relative max-w-6xl mx-auto py-16 px-8 sm:px-4">
        <button
          className="absolute top-6 left-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-medium text-gray-300 rounded-full shadow-lg transition-transform hover:scale-105"
          onClick={handleGoBack}
        >
          &#8592; Back
        </button>
        <div className="text-center space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-600">
            {task.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-4xl mx-auto">
            {task.description}
          </p>

          {/* Status and Priority */}
          <div className="flex justify-center space-x-8 mt-6">
            {/* Status */}
            <div className="flex items-center space-x-2 bg-gray-800 py-2 px-4 rounded-lg shadow-md">
              <span className="text-sm font-semibold text-teal-300">
                Status:
              </span>
              <span
                className={`text-sm font-bold py-1 px-3 rounded-full ${
                  task.status === "Completed"
                    ? "bg-green-500 text-white"
                    : "bg-yellow-500 text-gray-800"
                }`}
              >
                {task.status}
              </span>
            </div>

            {/* Priority */}
            <div className="flex items-center space-x-2 bg-gray-800 py-2 px-4 rounded-lg shadow-md">
              <span className="text-sm font-semibold text-teal-300">
                Priority:
              </span>
              <span
                className={`text-sm font-bold py-1 px-3 rounded-full ${
                  task.priority === "High"
                    ? "bg-red-500 text-white"
                    : task.priority === "Medium"
                    ? "bg-yellow-500 text-gray-800"
                    : "bg-green-500 text-white"
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        </div>

        {/* Subtasks */}
        <div className="mt-16 bg-opacity-70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-400 mb-6">
            Subtasks
          </h2>
          {task.subTasks?.length ? (
            <ul className="space-y-4">
              {task.subTasks.map((subTask: SubTask) => (
                <li
                  key={subTask.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
                >
                  <div className="sm:w-3/4">
                    <h3 className="text-lg sm:text-xl font-semibold text-teal-300">
                      {subTask.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {subTask.description}
                    </p>
                  </div>
                  <div className="flex space-x-4 mt-4 sm:mt-0 sm:w-1/4 justify-end">
                    <button
                      className="text-yellow-400 hover:text-green-300 transition-colors"
                      onClick={() => {
                        // Set the currentSubtask for editing
                        setCurrentSubtask(subTask);
                        openModal("isEditSubTaskModalOpen");
                      }}
                      title="Edit Sub Task"
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-400 hover:text-pink-300 transition-colors"
                      onClick={() => handleDeleteSubtask(subTask.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No subtasks available.</p>
          )}
        </div>
      </div>

      <TaskModals
        modalState={modalState}
        task={task}
        subtask={subtask}
        currentSubtask={currentSubtask}
        closeModal={closeModal}
        handleUpdateTask={handleUpdateTask}
        handleDeleteSubtask={handleDeleteSubtask}
        handleDeleteTask={handleDeleteTask}
        handleAddSubtask={handleAddSubtask}
        handleUpdateSubtask={handleUpdateSubtask}
      />
    </div>
  );
};

export default TaskDetail;
