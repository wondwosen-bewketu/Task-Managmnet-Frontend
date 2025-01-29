import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { SubTask } from "../../types/taskTypes";
import Button from "../UI/Button";
import ConfirmModal from "../UI/ConfirmModal";

interface SubtaskListProps {
  subtasks: SubTask[];
  onDeleteSubtask: (subTaskId: string) => Promise<void>;
}

const SubtaskList = ({ subtasks, onDeleteSubtask }: SubtaskListProps) => {
  const [selectedSubtaskId, setSelectedSubtaskId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteClick = (subTaskId: string) => {
    setSelectedSubtaskId(subTaskId);
  };

  const handleConfirmDelete = async () => {
    if (selectedSubtaskId) {
      setLoading(true);
      try {
        await onDeleteSubtask(selectedSubtaskId);
      } catch (error) {
        console.error("Failed to delete subtask:", error);
      } finally {
        setLoading(false);
        setSelectedSubtaskId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setSelectedSubtaskId(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-12 rounded-xl shadow-xl">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-500 to-pink-500 mb-8 text-center">
        Subtasks
      </h2>

      {subtasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subtasks.map((subtask) => (
            <div
              key={subtask._id}
              className="relative max-w-xs mx-auto bg-gradient-to-br from-purple-800 via-pink-700 to-yellow-600 p-4 md:p-6 rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 rounded-3xl z-0"></div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4 tracking-wide">
                  {subtask.title}
                </h3>
                <p className="text-gray-200 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  {subtask.description}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() =>
                      subtask._id && handleDeleteClick(subtask._id)
                    }
                    text={<FaTrashAlt />}
                    className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg shadow-md hover:scale-110 hover:shadow-xl transition-all duration-300 font-semibold"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic text-center text-lg mt-8">
          No subtasks available.
        </p>
      )}

      {selectedSubtaskId && (
        <ConfirmModal
          message="Are you sure you want to delete this subtask?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black z-50">
          <div className="spinner-border animate-spin border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
        </div>
      )}
    </div>
  );
};

export default SubtaskList;
