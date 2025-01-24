import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const Header = () => {
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

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl text-white">
            {isMenuOpen ? <HiX /> : <HiMenuAlt4 />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
