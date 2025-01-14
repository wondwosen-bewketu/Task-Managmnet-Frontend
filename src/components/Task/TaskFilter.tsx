// src/components/TaskFilter.tsx
import React from "react";

interface TaskFilterProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onSearch, searchTerm }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search tasks..."
        className="p-2 border-2 border-gray-300 rounded-lg w-full md:w-1/2"
      />
      <button
        className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
      >
        Filter Tasks
      </button>
    </div>
  );
};

export default TaskFilter;
