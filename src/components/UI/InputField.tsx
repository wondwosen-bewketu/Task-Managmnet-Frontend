import React from "react";

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  type?: "text" | "textarea" | "select";
  options?: string[];
  rows?: number;
  required?: boolean;
  name?: string;
};

const InputField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  options,
  rows = 3,
  required = false,
  name,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {type === "text" && (
        <input
          id={id}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder={placeholder}
        />
      )}
      {type === "textarea" && (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder={placeholder}
        />
      )}
      {type === "select" && options && (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default InputField;
