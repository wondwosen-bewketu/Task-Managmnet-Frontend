import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "../../types/taskTypes";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard task={task} />)
      ) : (
        <p className="text-center text-lg text-gray-500">No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
