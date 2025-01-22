import React, { useState, useEffect } from "react";
import SubtaskList from "../Sub Task/SubtaskList";
import axios from "axios";
import FilePreviewModal from "./FilePreviewModal"; // Import the preview modal

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

  // Fetch files for the task
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 mt-8">
      {/* Subtasks Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Subtasks</h2>
        <SubtaskList
          subtasks={subtasks}
          onEditSubtask={onEditSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      </div>

      {/* Files Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Files</h2>
        {loadingFiles ? (
          <p className="text-gray-400">Loading files...</p>
        ) : errorFiles ? (
          <p className="text-red-400">{errorFiles}</p>
        ) : files.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {files.map((file, index) => {
              const fileExtension = file.split(".").pop()?.toLowerCase();
              return (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg border border-gray-700 shadow hover:shadow-lg transition-all duration-300"
                  onClick={() => openPreviewModal(file, fileExtension!)}
                >
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={file}
                      alt={`File Preview ${index + 1}`}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                  </a>
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
