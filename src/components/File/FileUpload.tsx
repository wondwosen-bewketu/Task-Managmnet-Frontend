import React from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onDrop: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.png,.jpg,.pdf',
    maxSize: 10485760, // 10 MB
  });

  return (
    <div {...getRootProps()} className="border-dashed border-2 p-4 text-center cursor-pointer">
      <input {...getInputProps()} />
      <p>Drag & drop files here, or click to select files</p>
    </div>
  );
};

export default FileUpload;
