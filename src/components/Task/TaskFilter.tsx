import { HiOutlineChevronDown } from "react-icons/hi";

interface TaskFilterProps {
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

const TaskFilter = ({ onStatusChange, onPriorityChange }: TaskFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-1/3">
      <div className="relative w-full">
        <select
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full py-3 px-4 bg-white/70 backdrop-blur-md shadow-md rounded-full border focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <HiOutlineChevronDown className="absolute top-4 right-4 text-gray-400" />
      </div>

      <div className="relative w-full">
        <select
          onChange={(e) => onPriorityChange(e.target.value)}
          className="w-full py-3 px-4 bg-white/70 backdrop-blur-md shadow-md rounded-full border focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="urgent">Urgent</option>
          <option value="critical">Critical</option>
        </select>
        <HiOutlineChevronDown className="absolute top-4 right-4 text-gray-400" />
      </div>
    </div>
  );
};

export default TaskFilter;
