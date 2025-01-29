import { useState, useEffect } from "react";
import SubtaskList from "../Sub Task/SubtaskList";
import { FiFileText, FiFile } from "react-icons/fi";
import FilePreviewModal from "./FilePreviewModal";
import { SubTask } from "../../types/taskTypes";
import { useFileContext } from "../../context";

interface FilesAndSubtasksProps {
  subtasks: SubTask[];
  taskId: string;
  onEditSubtask: (subtask: SubTask) => void;
  onDeleteSubtask: (subTaskId: string) => Promise<void>;
}

const FilesAndSubtasks = ({
  subtasks,
  taskId,
  onDeleteSubtask,
}: FilesAndSubtasksProps) => {
  const { files, loadingFiles, errorFiles, handleFetchFiles } =
    useFileContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFileUrl, setCurrentFileUrl] = useState("");
  const [currentFileType, setCurrentFileType] = useState("");

  // Fetch files only if taskId changes or if files are not already loaded
  useEffect(() => {
    if (!files.length) {
      console.log("Fetching files for task:", taskId);
      handleFetchFiles(taskId);
    }
  }, [taskId, files.length, handleFetchFiles]);

  useEffect(() => {
    console.log("Files loaded:", files); // Log loaded files
  }, [files]);

  const openPreviewModal = (fileUrl: string, fileType: string) => {
    console.log("Opening preview modal for file:", fileUrl); // Debug log
    setCurrentFileUrl(fileUrl);
    setCurrentFileType(fileType);
    setIsModalOpen(true);
  };

  const closePreviewModal = () => setIsModalOpen(false);

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FiFile className="text-red-500 w-12 h-12" />;
      case "image":
        return <FiFile className="text-blue-500 w-12 h-12" />;
      default:
        return <FiFileText className="text-gray-500 w-12 h-12" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 mt-8">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 mb-6">
          Subtasks
        </h2>
        <SubtaskList subtasks={subtasks} onDeleteSubtask={onDeleteSubtask} />
      </div>

      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 mb-6">
          Files
        </h2>

        {/* Loading and error states */}
        {loadingFiles ? (
          <p className="text-gray-400">Loading files...</p>
        ) : errorFiles ? (
          <p className="text-red-400">{errorFiles}</p>
        ) : files.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {files.map((file, index) => {
              const fileExtension = file.split(".").pop()?.toLowerCase();
              const fileType =
                fileExtension === "pdf"
                  ? "pdf"
                  : fileExtension?.startsWith("image")
                  ? "image"
                  : "other";

              return (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-gray-800 to-gray-900"
                  onClick={() => openPreviewModal(file, fileType)}
                >
                  <div className="w-full h-full flex justify-center items-center bg-gray-900 text-white p-4">
                    {getFileIcon(fileType)}
                  </div>
                  <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-center text-sm text-white py-2">
                    {file.split("/").pop()}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400">No files available.</p>
        )}
      </div>

      {/* File Preview Modal */}
      <FilePreviewModal
        isOpen={isModalOpen}
        fileUrl={currentFileUrl}
        fileType={currentFileType}
        onClose={closePreviewModal}
      />
    </div>
  );
};

export default FilesAndSubtasks;
