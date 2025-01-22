import React from "react";
import { SubTask } from "../../types/taskTypes";

interface SubtaskListProps {
  subtasks: SubTask[];
  onEditSubtask: (subtask: SubTask) => void;
  onDeleteSubtask: (subTaskId: string) => void;
}

const SubtaskList: React.FC<SubtaskListProps> = ({
  subtasks,
  onEditSubtask,
  onDeleteSubtask,
}) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl p-16">
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-500 to-pink-500 mb-12 text-center tracking-tight">
        Subtasks
      </h2>

      {subtasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-16 px-4">
          {subtasks.map((subtask) => (
            <div
              key={subtask._id}
              className="bg-gradient-to-br from-purple-700 via-pink-600 to-yellow-500 p-8 rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-lg border border-opacity-10 border-white hover:translate-y-2"
            >
              <h3 className="text-2xl font-semibold text-white mb-4 tracking-wide">
                {subtask.title}
              </h3>
              <p className="text-gray-200 mb-6 leading-relaxed text-sm sm:text-base">
                {subtask.description}
              </p>
              <div className="flex gap-6 justify-center">
                <button
                  onClick={() => onEditSubtask(subtask)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 font-semibold backdrop-blur-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDeleteSubtask(subtask._id)}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 font-semibold backdrop-blur-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic text-center text-xl font-light mt-12">
          No subtasks available.
        </p>
      )}
    </div>
  );
};

export default SubtaskList;
