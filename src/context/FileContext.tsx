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


interface FileProviderProps {
  children: React.ReactNode;
}
export const FileProvider = ({ children }: FileProviderProps) => {
  const [files, setFiles] = useState<string[]>([]);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
  const [errorFiles, setErrorFiles] = useState<string | null>(null);

  const handleFetchFiles = async (taskId: string) => {
    setLoadingFiles(true);
    try {
      const fetchedFiles = await fetchFiles(taskId);
      setFiles(fetchedFiles);
      setErrorFiles(null);
    } catch {
      setErrorFiles("Failed to fetch files.");
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleUploadFile = async (file: File, taskId: string) => {
    try {
      const response = await uploadFile(file, taskId);
      setFiles((prevFiles) => [...prevFiles, response.url]);
    } catch (error) {
      setErrorFiles("Failed to upload file. Please try again.");
      console.error("Error uploading file:", error);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      await deleteFile(fileId);
      setFiles((prevFiles) => prevFiles.filter((file) => file !== fileId));
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
