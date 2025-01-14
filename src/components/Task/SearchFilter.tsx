// src/components/SearchFilter.tsx
import React from 'react';

const SearchFilter: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filters */}
      <select className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="in-progress">In Progress</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default SearchFilter;
