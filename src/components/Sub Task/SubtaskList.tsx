import { SubTask } from "../../types/taskTypes";
import Button from "../UI/Button";

interface SubtaskListProps {
  subtasks: SubTask[];
  onEditSubtask: (subtask: SubTask) => void;
  onDeleteSubtask: (subTaskId: string) => void;
}

const SubtaskList = ({
  subtasks,
  onEditSubtask,
  onDeleteSubtask,
}: SubtaskListProps) => {
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
                    onClick={() => onEditSubtask(subtask)}
                    text="✏️ Edit"
                    className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-md hover:scale-110 hover:shadow-xl transition-all duration-300 font-semibold"
                  />
                  <Button
                    onClick={() => subtask._id && onDeleteSubtask(subtask._id)}
                    text="🗑️ Delete"
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
    </div>
  );
};

export default SubtaskList;
