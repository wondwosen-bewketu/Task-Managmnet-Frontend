import { useState } from "react";
import { useFileContext } from "../../context/FileContext";
import { useDropzone } from "react-dropzone";
import Button from "../UI/Button";

interface FileUploadProps {
  taskId: string;
  onClose: () => void;
}

const FileUpload = ({ taskId, onClose }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { handleUploadFile } = useFileContext();

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setErrorMessage(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/plain": [".txt"],
    },
  });

  const handleFileUpload = async () => {
    if (!file) return;

    setUploading(true);
    setErrorMessage(null);

    try {
      await handleUploadFile(file, taskId);
      onClose(); // Close modal after upload
    } catch {
      setErrorMessage("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-2xl font-bold mb-6">Upload File</h3>

        <div
          {...getRootProps()}
          className="border-4 border-dashed border-gray-300 p-8 text-center cursor-pointer hover:border-blue-500 transition-all"
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

        <div className="flex gap-4 mt-6 justify-center">
          <Button
            onClick={handleFileUpload}
            text={uploading ? "Uploading..." : "Upload"}
            className={`px-6 py-3 text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-all ${
              uploading ? "opacity-50" : ""
            }`}
            disabled={!file || uploading}
          />
          <Button
            onClick={onClose}
            text="Cancel"
            className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
          />
        </div>

        {errorMessage && (
          <div className="mt-4 text-red-600">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
