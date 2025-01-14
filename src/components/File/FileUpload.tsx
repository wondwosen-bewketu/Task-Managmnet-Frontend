import React, { useState } from "react";

// Define the props for FileUpload component
interface FileUploadProps {
  onFilesChange: (files: File[]) => void; // Function to handle file changes
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesChange }) => {
  const [files, setFiles] = useState<File[]>([]);

  // Handle file drop
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    const fileArray = Array.from(droppedFiles);
    setFiles(fileArray);
    onFilesChange(fileArray); // Pass the files to the parent
  };

  // Handle file selection via input
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray);
      onFilesChange(fileArray); // Pass the files to the parent
    }
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-dashed border-2 p-4 text-center"
    >
      <input type="file" onChange={onFileChange} multiple className="mb-4" />
      <p>Drag and drop files here or click to select files.</p>

      <div className="mt-4">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index} className="mb-2">
              <p>{file.name}</p>
              {/* You can add file preview functionality here */}
            </div>
          ))
        ) : (
          <p>No files selected</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
