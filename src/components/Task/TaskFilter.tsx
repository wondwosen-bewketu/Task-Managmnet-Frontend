import React from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

interface TaskFilterProps {
  onChange: (value: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onChange }) => {
  return (
    <div className="relative w-full sm:w-1/3">
      <select
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-3 px-4 bg-white/70 backdrop-blur-md shadow-md rounded-full border focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <HiOutlineChevronDown className="absolute top-4 right-4 text-gray-400" />
    </div>
  );
};

export default TaskFilter;
