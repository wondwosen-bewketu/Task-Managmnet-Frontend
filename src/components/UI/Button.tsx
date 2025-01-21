import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTaskById,
  updateTask,
  deleteSubtask,
  updateSubtask,
} from "../../api/taskService";
import TaskModal from "../UI/Modal";
import SubtaskForm from "../Sub Task/SubtaskForm";
import TaskEdit from "./TaskEdit";
import { FaEdit, FaTrash, FaPlus, FaFileUpload } from "react-icons/fa";
import DeleteTaskForm from "./DeleteTaskForm";
import FileUpload from "../File/FileUpload";
import { toast } from "react-toastify";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSubtask, setCurrentSubtask] = useState(null);
  const [modalState, setModalState] = useState({
    subtaskForm: false,
    editTask: false,
    deleteTask: false,
    fileUpload: false,
  });

  const toggleModal = (modalKey) => {
    setModalState((prev) => ({ ...prev, [modalKey]: !prev[modalKey] }));
  };

  useEffect(() => {
    const fetchTask = async () => {
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

    fetchTask();
  }, [id]);

  const handleUpdateTask = async (updatedTask) => {
    if (id) {
      try {
        const updated = await updateTask(id, updatedTask);
        setTask(updated);
        toggleModal("editTask");
        toast.success("Task updated successfully!");
      } catch {
        toast.error("Failed to update task.");
      }
    }
  };

  const handleEditSubtask = async (subTaskId, updatedSubtask) => {
    if (!id) return;

    try {
      await updateSubtask(id, subTaskId, updatedSubtask);
      const updatedTask = await getTaskById(id);
      setTask(updatedTask);
      setCurrentSubtask(null);
      toast.success("Subtask updated successfully!");
    } catch {
      toast.error("Failed to update subtask.");
    }
  };

  const handleDeleteSubtask = async (subTaskId) => {
    if (!id) return;

    try {
      await deleteSubtask(id, subTaskId);
      const updatedTask = await getTaskById(id);
      setTask(updatedTask);
      toast.success("Subtask deleted successfully!");
    } catch {
      toast.error("Failed to delete subtask.");
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
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-purple-800 to-black blur-3xl opacity-50 animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto py-16 px-8">
        <button
          className="absolute top-6 left-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-medium text-gray-300 rounded-full shadow-lg transition-transform hover:scale-105"
          onClick={handleGoBack}
        >
          &#8592; Back
        </button>
        <div className="text-center space-y-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gradient">
            {task.title}
          </h1>
          <p className="text-lg text-gray-400">{task.description}</p>
        </div>

        <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4">Subtasks</h2>
          {task.subTasks?.length ? (
            <ul>
              {task.subTasks.map((subTask) => (
                <li
                  key={subTask.id}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded mb-2"
                >
                  <div>
                    <h3 className="text-teal-300">{subTask.title}</h3>
                    <p className="text-gray-400">{subTask.description}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      className="text-yellow-300"
                      onClick={() => {
                        setCurrentSubtask(subTask);
                        toggleModal("subtaskForm");
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-400"
                      onClick={() => handleDeleteSubtask(subTask.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No subtasks available.</p>
          )}
        </div>
      </div>

      {/* Modals */}
      {modalState.editTask && (
        <TaskModal
          isOpen={modalState.editTask}
          onClose={() => toggleModal("editTask")}
        >
          <TaskEdit task={task} onSubmit={handleUpdateTask} />
        </TaskModal>
      )}
      {modalState.subtaskForm && (
        <TaskModal
          isOpen={modalState.subtaskForm}
          onClose={() => toggleModal("subtaskForm")}
        >
          <SubtaskForm subtask={currentSubtask} onSubmit={handleEditSubtask} />
        </TaskModal>
      )}
    </div>
  );
};

export default TaskDetail;
