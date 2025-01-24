interface FilePreviewModalProps {
  isOpen: boolean;
  fileUrl: string;
  fileType: string;
  onClose: () => void;
}

const FilePreviewModal = ({
  isOpen,
  fileUrl,
  fileType,
  onClose,
}: FilePreviewModalProps) => {
  if (!isOpen) return null;

  const fileExtension = fileType.split(".").pop()?.toLowerCase();

  const renderPreviewContent = () => {
    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension || "")) {
      return (
        <img
          src={fileUrl}
          alt="File Preview"
          className="w-full h-full object-contain rounded-lg shadow-md"
        />
      );
    } else if (fileExtension === "pdf") {
      return (
        <iframe
          src={fileUrl}
          width="100%"
          height="500px"
          title="PDF Preview"
          className="border rounded-lg shadow-md"
        />
      );
    } else {
      return (
        <a href={fileUrl} download>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-700 transition-all duration-300 shadow-md">
            Download {fileExtension?.toUpperCase()} File
          </button>
        </a>
      );
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-3xl transform transition-all duration-500 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-800 text-white w-8 h-8 flex justify-center items-center rounded-full hover:bg-red-500 transition-colors duration-300"
        >
          ✖
        </button>

        <div className="text-center">
          <h3 className="text-3xl font-semibold mb-6 text-gray-700">
            File Preview
          </h3>
          <div className="flex justify-center items-center border-dashed border-2 border-gray-300 p-4 rounded-lg bg-gray-100">
            {renderPreviewContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;
