import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../../types/taskTypes";
import { getTasks } from "../../api/taskService"; // Import the updated API function

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const tasksPerPage = 9;

  const fetchTasks = async (page: number, limit: number) => {
    try {
      const { tasks, total } = await getTasks(page, limit);
      setTasks(tasks);
      setTotalTasks(total);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage, tasksPerPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task._id} task={task} />)
        ) : (
          <p className="text-center text-lg text-gray-500">No tasks found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <ul className="flex space-x-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 cursor-pointer rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-600 hover:text-white transition-all`}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
