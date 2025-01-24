// TaskList.tsx
import TaskCard from "./TaskCard";
import TaskFilter from "./TaskFilter";
import SearchBar from "./SearchFilter";
import useTask from "../../hooks/useTask";

const TaskList = () => {
  const {
    filteredTasks,
    loading,
    error,
    totalPages,
    currentPage,
    handlePageChange,
    setStatusFilter,
    setPriorityFilter,
    setSearchQuery,
  } = useTask();

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <SearchBar onSearch={setSearchQuery} />
        <TaskFilter
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskCard key={task._id} task={task} />)
        ) : (
          <p className="text-center text-lg text-gray-500">No tasks found.</p>
        )}
      </div>

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
