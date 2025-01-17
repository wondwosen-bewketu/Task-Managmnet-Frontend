import React, { useState } from "react";
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineClipboardList,
  HiOutlinePaperClip,
  HiOutlineEye,
} from "react-icons/hi";
import { Task } from "../../types/taskTypes";
import { useNavigate } from "react-router-dom";
import TaskEdit from "./TaskEdit";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
    // You could also navigate to the edit page if you want to use a route instead
    // navigate(`/task/edit/${task.id}`);
  };

  const handleViewClick = () => {
    navigate(`/task}`);
  };

  return (
    <div className="bg-white p-6 border border-gray-300 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-2xl text-gray-800 mb-2">
            {task.title}
          </h3>
          <p className="text-gray-600 text-sm">{task.description}</p>
        </div>
        <div className="flex space-x-4 text-gray-600 text-2xl">
          <HiOutlinePencilAlt
            className="cursor-pointer hover:text-black transition-all duration-300 transform hover:scale-110"
            onClick={handleEditClick}
          />
          <HiOutlineTrash className="cursor-pointer hover:text-red-600 transition-all duration-300 transform hover:scale-110" />
          <HiOutlineClipboardList className="cursor-pointer hover:text-blue-600 transition-all duration-300 transform hover:scale-110" />
          <HiOutlinePaperClip className="cursor-pointer hover:text-teal-600 transition-all duration-300 transform hover:scale-110" />
          <HiOutlineEye
            className="cursor-pointer hover:text-gray-800 transition-all duration-300 transform hover:scale-110"
            onClick={handleViewClick}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusStyle(
            task.status
          )}`}
        >
          {task.status}
        </span>
        <span className="text-sm text-gray-600">{task.priority}</span>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Render TaskEdit component */}
            <TaskEdit />
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-2 text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-200 text-green-800";
    case "pending":
      return "bg-yellow-200 text-yellow-800";
    case "in-progress":
      return "bg-blue-200 text-blue-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

export default TaskCard;
