// FilesAndSubtasks Component
import React, { useState, useEffect } from "react";
import SubtaskList from "../Sub Task/SubtaskList";
import axios from "axios";
import FilePreviewModal from "./FilePreviewModal";
import { FiFileText, FiFile } from "react-icons/fi";

interface FilesAndSubtasksProps {
  subtasks: any[];
  taskId: string;
  onEditSubtask: (subtask: any) => void;
  onDeleteSubtask: (subTaskId: string) => void;
}

const FilesAndSubtasks: React.FC<FilesAndSubtasksProps> = ({
  subtasks,
  taskId,
  onEditSubtask,
  onDeleteSubtask,
}) => {
  const [files, setFiles] = useState<string[]>([]);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(true);
  const [errorFiles, setErrorFiles] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFileUrl, setCurrentFileUrl] = useState("");
  const [currentFileType, setCurrentFileType] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoadingFiles(true);
        const response = await axios.get(
          `http://localhost:3000/files/task/${taskId}/files`
        );
        setFiles(response.data.files || []);
      } catch (error) {
        setErrorFiles("Failed to fetch files.");
      } finally {
        setLoadingFiles(false);
      }
    };

    fetchFiles();
  }, [taskId]);

  const openPreviewModal = (fileUrl: string, fileType: string) => {
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
      {/* Subtasks Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 mb-6">
          Subtasks
        </h2>
        <SubtaskList
          subtasks={subtasks}
          onEditSubtask={onEditSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      </div>

      {/* Files Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 mb-6">
          Files
        </h2>
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

      {/* Preview Modal */}
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
