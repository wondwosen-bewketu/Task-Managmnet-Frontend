// src/components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-extrabold text-primary tracking-wide">
          Task Manager Pro
        </h1>
        <nav className="space-x-6">
          <a
            href="/"
            className="text-white hover:text-primary transition font-medium"
          >
            Home
          </a>
          <a
            href="/tasks"
            className="text-white hover:text-primary transition font-medium"
          >
            Tasks
          </a>
          <a
            href="/about"
            className="text-white hover:text-primary transition font-medium"
          >
            About
          </a>
        </nav>
        <button className="bg-primary text-white px-5 py-2 rounded-lg shadow-button hover:bg-purple-700 font-semibold">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
