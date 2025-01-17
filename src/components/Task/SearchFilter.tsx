import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
      <HiOutlineSearch className="absolute top-3 left-4 text-gray-400 text-xl" />
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search tasks..."
        className="w-full py-3 pl-12 pr-4 bg-white/70 backdrop-blur-md shadow-md rounded-full border focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  );
};

export default SearchBar;
