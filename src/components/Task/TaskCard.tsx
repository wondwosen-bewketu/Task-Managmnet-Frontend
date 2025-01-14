// src/components/TaskCard.tsx
import React, { useState } from "react";
import { Task } from "../../types/taskTypes";
import { FaEdit, FaTrash } from "react-icons/fa";
import FileUpload from "../File/FileUpload";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Simulate saving the task (you should integrate with API here)
    task.title = title;
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      ) : (
        <h3 className="font-semibold text-2xl text-gray-900 mb-3">
          {task.title}
        </h3>
      )}
      <p className="text-gray-500 mb-5 text-lg">{task.description}</p>
      <div className="flex items-center justify-between">
        <FileUpload taskId={task._id} />
        <div>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              <FaEdit />
            </button>
          )}
          <button
            onClick={() => console.log(`Deleting task ${task._id}`)} // Implement delete functionality
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
