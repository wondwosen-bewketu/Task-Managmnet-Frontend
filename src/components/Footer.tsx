import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
        </p>
        <div className="flex space-x-6 justify-center md:justify-end">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-600 transition-colors duration-300"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-400 transition-colors duration-300"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-700 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
