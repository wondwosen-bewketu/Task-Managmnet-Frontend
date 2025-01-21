import React from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Task } from "../../types/taskTypes";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate(`/task/${task._id}`);
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
          <HiOutlineClipboardList
            className="cursor-pointer hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
            onClick={handleIconClick}
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
