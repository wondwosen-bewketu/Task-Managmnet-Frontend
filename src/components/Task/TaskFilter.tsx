import { HiOutlineChevronDown } from "react-icons/hi";
import { TaskPriority, Status } from "../../types";

interface TaskFilterProps {
  onStatusChange: (value: Status) => void;
  onPriorityChange: (value: TaskPriority) => void;
}

const TaskFilter = ({ onStatusChange, onPriorityChange }: TaskFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-1/3">
      <div className="relative w-full">
        <select
          onChange={(e) => onStatusChange(e.target.value as Status)}
          className="w-full py-3 px-4 bg-white/70 backdrop-blur-md shadow-md rounded-full border focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="all">All Statuses</option>
          <option value={Status.Pending}>{Status.Pending}</option>
          <option value={Status.InProgress}>{Status.InProgress}</option>
          <option value={Status.Completed}>{Status.Completed}</option>
          <option value={Status.Cancelled}>{Status.Cancelled}</option>
        </select>
        <HiOutlineChevronDown className="absolute top-4 right-4 text-gray-400" />
      </div>

      <div className="relative w-full">
        <select
          onChange={(e) => onPriorityChange(e.target.value as TaskPriority)}
          className="w-full py-3 px-4 bg-white/70 backdrop-blur-md shadow-md rounded-full border focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="all">All Priorities</option>
          <option value={TaskPriority.High}>{TaskPriority.High}</option>
          <option value={TaskPriority.Medium}>{TaskPriority.Medium}</option>
          <option value={TaskPriority.Low}>{TaskPriority.Low}</option>
          <option value={TaskPriority.Urgent}>{TaskPriority.Urgent}</option>
          <option value={TaskPriority.Critical}>{TaskPriority.Critical}</option>
        </select>
        <HiOutlineChevronDown className="absolute top-4 right-4 text-gray-400" />
      </div>
    </div>
  );
};

export default TaskFilter;
