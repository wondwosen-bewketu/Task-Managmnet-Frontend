// FileUpload.tsx
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

interface FileUploadProps {
  taskId: string;
  onClose: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ taskId, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".jpg,.jpeg,.png,.pdf,.docx,.xlsx,.txt", // allowed file types
  });

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/files/upload?taskId=${taskId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadSuccess(true);
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-2xl font-bold mb-6">Upload File</h3>

        {/* Drag and Drop Area */}
        <div
          {...getRootProps()}
          className="border-4 border-dashed border-gray-300 p-8 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            Drag & drop your file here, or click to select a file
          </p>
        </div>

        {file && (
          <div className="mt-4">
            <p className="text-sm text-gray-700">Selected file: {file.name}</p>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex gap-4 mt-6 justify-center">
          <button
            onClick={handleFileUpload}
            disabled={!file || uploading}
            className={`px-6 py-3 text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-all ${
              uploading ? "opacity-50" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
        </div>

        {uploadSuccess && (
          <div className="mt-4 text-green-600">
            <p>File uploaded successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
