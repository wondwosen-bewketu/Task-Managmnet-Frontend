import { useState } from "react";
import TaskList from "./TaskList";
import TaskModal from "../UI/Modal";
import TaskForm from "./TaskForm";
import Button from "../UI/Button";
import { useTask } from "../../context/TaskContext"; 
import { Task } from "../../types";

const TaskBoard = () => {
  const { loading, error, handleAddTask, loadTasks } = useTask();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddTaskWrapper = async (newTask: Task) => {
    try {
      await handleAddTask(newTask);
      setIsModalOpen(false);
      await loadTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
        <p className="ml-4 text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Task Dashboard
      </h1>
      <div className="flex justify-end mb-8">
        <Button onClick={() => setIsModalOpen(true)} text="Add Task" />
      </div>
      <TaskList />
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleAddTaskWrapper}
          closeModal={() => setIsModalOpen(false)}
        />
      </TaskModal>
    </div>
  );
};

export default TaskBoard;
