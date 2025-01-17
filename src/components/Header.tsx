import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white hover:text-gray-300 transition-colors duration-300">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-4xl">📋</span>
            <span>Task Manager</span>
          </Link>
        </h1>

        {/* Navigation for larger screens */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/tasks"
            className="hover:text-gray-300 transition-colors duration-300 text-lg font-medium"
          >
            Tasks
          </Link>
          <Link
            to="/create-task"
            className="hover:text-gray-300 transition-colors duration-300 text-lg font-medium"
          >
            Create Task
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-300 transition-colors duration-300 text-lg font-medium"
          >
            About
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl text-white">
            {isMenuOpen ? <HiX /> : <HiMenuAlt4 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white p-4 space-y-4 shadow-lg">
          <Link
            to="/tasks"
            className="block text-lg font-medium hover:text-gray-300 transition-colors duration-300"
          >
            Tasks
          </Link>
          <Link
            to="/create-task"
            className="block text-lg font-medium hover:text-gray-300 transition-colors duration-300"
          >
            Create Task
          </Link>
          <Link
            to="/about"
            className="block text-lg font-medium hover:text-gray-300 transition-colors duration-300"
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
