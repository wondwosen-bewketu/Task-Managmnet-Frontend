import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
      <HiOutlineSearch className="absolute top-3 left-4 text-gray-400 text-xl" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search tasks..."
        aria-label="Search tasks"
        className="w-full py-3 pl-12 pr-4 bg-white/70 backdrop-blur-md shadow-md rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
      />
    </div>
  );
};

export default SearchBar;
