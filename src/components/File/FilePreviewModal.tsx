import React, { useState } from "react";

interface FilePreviewModalProps {
  isOpen: boolean;
  fileUrl: string;
  fileType: string;
  onClose: () => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  fileUrl,
  fileType,
  onClose,
}) => {
  if (!isOpen) return null; // If modal is closed, return nothing

  const fileExtension = fileType.split(".").pop()?.toLowerCase();

  const renderPreviewContent = () => {
    if (
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png" ||
      fileExtension === "gif"
    ) {
      return (
        <img
          src={fileUrl}
          alt="File Preview"
          className="w-full h-full object-contain"
        />
      );
    } else if (fileExtension === "pdf") {
      return (
        <iframe
          src={fileUrl}
          width="100%"
          height="500px"
          title="PDF Preview"
          className="border-none"
        />
      );
    } else {
      return (
        <a href={fileUrl} download>
          <button className="bg-blue-500 text-white p-3 rounded-lg mt-4">
            Download {fileExtension?.toUpperCase()} File
          </button>
        </a>
      );
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
        >
          ✖️
        </button>
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">File Preview</h3>
          {renderPreviewContent()}
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;
