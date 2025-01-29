import React, { createContext, useContext, useState } from "react";
import { uploadFile, fetchFiles, deleteFile } from "../services";

interface FileContextType {
  files: string[];
  loadingFiles: boolean;
  errorFiles: string | null;
  handleUploadFile: (file: File, taskId: string) => Promise<void>;
  handleFetchFiles: (taskId: string) => Promise<void>;
  handleDeleteFile: (fileId: string) => Promise<void>;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [files, setFiles] = useState<string[]>([]);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false); // Start as false
  const [errorFiles, setErrorFiles] = useState<string | null>(null);

  // Fetch files based on taskId
  const handleFetchFiles = async (taskId: string) => {
    setLoadingFiles(true); // Set loading state to true when fetching starts
    try {
      const fetchedFiles = await fetchFiles(taskId); // Fetch files from API or service
      setFiles(fetchedFiles); // Update the files state
      setErrorFiles(null); // Reset error state if fetching succeeds
    } catch {
      setErrorFiles("Failed to fetch files."); // Set error if something goes wrong
    } finally {
      setLoadingFiles(false); // Set loading state to false once fetching is done
    }
  };

  // Handle file upload
  const handleUploadFile = async (file: File, taskId: string) => {
    try {
      const response = await uploadFile(file, taskId); // Upload file via the service
      setFiles((prevFiles) => [...prevFiles, response.url]); // Add the new file URL to the state
    } catch (error) {
      setErrorFiles("Failed to upload file. Please try again.");
      console.error("Error uploading file:", error);
    }
  };

  // Handle file deletion
  const handleDeleteFile = async (fileId: string) => {
    try {
      await deleteFile(fileId); // Delete file using the service
      setFiles((prevFiles) => prevFiles.filter((file) => file !== fileId)); // Remove the file from the state
    } catch (error) {
      setErrorFiles("Failed to delete file. Please try again.");
      console.error("Error deleting file:", error);
    }
  };

  return (
    <FileContext.Provider
      value={{
        files,
        loadingFiles,
        errorFiles,
        handleUploadFile,
        handleFetchFiles,
        handleDeleteFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
