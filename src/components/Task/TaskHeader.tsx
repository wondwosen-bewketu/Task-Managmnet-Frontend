import { useState } from "react";
import { Task } from "../../types/taskTypes";
import Button from "../UI/Button";
import FileUpload from "../File/FileUpload";

interface TaskHeaderProps {
  task: Task;
  onUpdateTaskStatus: (status: string) => void;
  onGoBack: () => void;
  onEditTask: () => void;
  onDeleteTask: () => void;
  onAddSubtask: () => void;
}

const TaskHeader = ({
  task,
  onUpdateTaskStatus,
  onGoBack,
  onEditTask,
  onDeleteTask,
  onAddSubtask,
}: TaskHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openFileUploadModal = () => {
    setIsModalOpen(true);
  };

  const closeFileUploadModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-2xl p-4 sm:p-6 md:p-8 w-full min-h-[200px] md:min-h-[300px] relative">
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-gradient-to-br from-purple-600 via-teal-500 to-cyan-500 blur-3xl"></div>

      <div className="flex flex-col md:flex-row justify-between items-center w-full relative gap-6 md:gap-4">
        <Button
          onClick={onGoBack}
          text="← Back"
          className="mb-4 md:mb-6 text-teal-400 hover:text-teal-200 transition-all text-base md:text-lg font-semibold"
        />
        <div className="flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 flex-grow">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 mb-2 md:mb-4">
            {task.title}
          </h1>
          <p className="text-gray-300 text-base md:text-lg mb-4 md:mb-8 px-4 md:px-8">
            {task.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 md:mb-8">
            <span className="font-medium text-gray-300 text-base md:text-lg">
              Status:
            </span>
            <select
              value={task.status}
              onChange={(e) => onUpdateTaskStatus(e.target.value)}
              className="w-full sm:w-auto px-3 md:px-4 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg shadow-lg border-2 border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-transform transform hover:scale-105 text-sm md:text-base"
            >
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row md:flex-col gap-2 sm:gap-4 md:gap-6 z-10 w-full md:w-auto justify-center">
          <Button
            onClick={onEditTask}
            text="✏️ Edit"
            className="flex-1 md:flex-none px-3 sm:px-4 md:px-6 py-2 md:py-4 text-sm md:text-base text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl transform hover:scale-110 hover:shadow-2xl transition-all"
          />

          <Button
            onClick={onDeleteTask}
            text="🗑️ Delete"
            className="flex-1 md:flex-none px-3 sm:px-4 md:px-6 py-2 md:py-4 text-sm md:text-base text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-xl transform hover:scale-110 hover:shadow-2xl transition-all"
          />

          <Button
            onClick={onAddSubtask}
            text="➕ Add"
            className="flex-1 md:flex-none px-3 sm:px-4 md:px-6 py-2 md:py-4 text-sm md:text-base text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-xl transform hover:scale-110 hover:shadow-2xl transition-all"
          />

          <Button
            onClick={openFileUploadModal}
            text="📂 Add File"
            className="mt-6 px-6 py-4 text-white bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg shadow-xl transform hover:scale-110 hover:shadow-2xl transition-all"
          />
        </div>
      </div>
      {isModalOpen && task._id && (
        <FileUpload taskId={task._id} onClose={closeFileUploadModal} />
      )}
    </div>
  );
};

export default TaskHeader;
