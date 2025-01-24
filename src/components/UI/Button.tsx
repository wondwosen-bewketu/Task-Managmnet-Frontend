import React from "react";

interface ButtonProps {
  onClick: (e: React.FormEvent) => void;
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  onClick,
  text,
  className = "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:scale-105 transition-transform",
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick || (() => {})} // Provide a default empty function
      className={`${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
