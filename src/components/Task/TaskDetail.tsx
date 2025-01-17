import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Task } from "../../types/taskTypes"; // Import Task type
import { getTaskById } from "../../api/taskService"; // Import API function for fetching a task

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get task ID from the URL params
  const [task, setTask] = useState<Task | null>(null); // Store the task data
  const [error, setError] = useState<string | null>(null); // Store error message
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Load task when the component is mounted or when the task ID changes
  useEffect(() => {
    const loadTask = async () => {
      setLoading(true); // Set loading state to true while fetching
      setError(null); // Clear any previous errors
      try {
        const fetchedTask = await getTaskById({}); // Fetch task by ID
        setTask(fetchedTask); // Set the task data
      } catch {
        setError("Failed to load task details. Please try again later."); // Set error message if fetch fails
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    loadTask();
  }, [id]); // Re-run this effect when the task ID changes

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
        <p className="ml-4">Loading task details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Show error message if task fetch fails
  }

  if (!task) {
    return (
      <div className="text-center text-gray-500">
        Task not found. Please check the task ID.
      </div>
    ); // If no task data is available
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        {task.title}
      </h2>
      <p className="text-gray-600 my-4">{task.description}</p>
      <span className="block text-sm text-gray-500 mt-4">
        <strong>Status:</strong> {task.status}
      </span>
      <span className="block text-sm text-gray-500 mt-2">
        <strong>Priority:</strong> {task.priority || "Not specified"}
      </span>
      {task.subTasks && task.subTasks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Subtasks:</h3>
          <ul className="list-disc pl-5">
            {task.subTasks.map((subTask, index) => (
              <li key={index} className="text-gray-600">
                <strong>{subTask.title}</strong>: {subTask.status}
              </li>
            ))}
          </ul>
        </div>
      )}
      {task.attachments && task.attachments.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Attachments:</h3>
          <ul className="list-disc pl-5">
            {task.attachments.map((attachment, index) => (
              <li key={index} className="text-gray-600">
                <a
                  href={attachment}
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Attachment {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
