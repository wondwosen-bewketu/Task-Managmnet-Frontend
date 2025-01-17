import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  customStyles?: string;
}

const TaskModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  width = "500px",
  height = "auto",
  customStyles = "",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // Fade out the modal before closing
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 200); // Wait for transition duration before hiding the modal
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      style={{ transition: "opacity 0.2s ease-in-out" }}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl p-6 sm:p-10 relative overflow-hidden ${customStyles}`}
        style={{
          width,
          height,
          transform: isOpen ? "scale(1)" : "scale(0.9)",
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 text-xl font-bold hover:text-gray-800 transition-colors"
          >
            &times;
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default TaskModal;
