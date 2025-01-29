import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
        </p>
        <div className="flex space-x-6 justify-center md:justify-end">
          <a
            href="https://wendis-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-600 transition-colors duration-300"
            aria-label="My Website"
          >
            🌐
          </a>
          <a
            href="https://www.linkedin.com/in/wondwosen-bewketu-06b553282/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-600 transition-colors duration-300"
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
