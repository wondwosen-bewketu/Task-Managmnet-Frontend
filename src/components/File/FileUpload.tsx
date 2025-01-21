import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa"; // File upload icon
import { MdError, MdCheckCircle } from "react-icons/md"; // Error and success indication icons
import axios from "axios"; // Import Axios for API calls

interface FileUploadProps {
  onDrop: (files: File[]) => void;
  taskId: string; // Pass the taskId as a prop
}

const FileUpload: React.FC<FileUploadProps> = ({ onDrop, taskId }) => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null); // Track upload status (URL or error)
  const [isUploading, setIsUploading] = useState(false); // Track upload progress

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: ".png,.jpg,.pdf",
      maxSize: 10485760, // 10 MB
    });

  const handleFileUpload = async (file: File) => {
    setIsUploading(true); // Start upload
    setUploadStatus(null); // Reset status before upload

    // Prepare FormData for the file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("taskId", taskId);

    try {
      // Make POST request to backend for file upload
      const response = await axios.post(
        "http://localhost:3000/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle successful upload
      setIsUploading(false);
      setUploadStatus(`File uploaded successfully! URL: ${response.data.url}`);
    } catch (error) {
      // Handle error
      setIsUploading(false);
      setUploadStatus("Error uploading file. Please try again.");
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    // Handle file drop
    if (acceptedFiles.length > 0) {
      handleFileUpload(acceptedFiles[0]); // Upload the first file dropped
    }
  };

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center p-12 w-full max-w-xl border-2 rounded-xl cursor-pointer transition-all duration-300 ease-in-out
      ${
        isDragActive
          ? "bg-gradient-to-r from-green-600 to-teal-600"
          : "bg-gradient-to-r from-gray-800 to-gray-900"
      }
      ${
        isDragReject ? "border-red-500" : "border-gray-600"
      } hover:scale-105 hover:shadow-2xl transform`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center text-gray-200">
        <FaFileUpload className="text-6xl mb-6 text-gray-300" />
        <p className="text-xl font-semibold tracking-wider text-center text-gray-100">
          {isDragActive ? "Release to upload" : "Drag & Drop Files Here"}
        </p>
        <p className="text-sm opacity-80 mt-2 text-gray-400">
          or click to select files. Max size: 10MB
        </p>

        {/* Upload Status */}
        {uploadStatus && (
          <div className="mt-4">
            {uploadStatus.includes("Error") ? (
              <div className="text-red-500">
                <MdError className="text-4xl" />
                <p className="text-sm text-center text-red-500 mt-2">
                  {uploadStatus}
                </p>
              </div>
            ) : (
              <div className="text-green-500">
                <MdCheckCircle className="text-4xl" />
                <p className="text-sm text-center text-green-500 mt-2">
                  {uploadStatus}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
