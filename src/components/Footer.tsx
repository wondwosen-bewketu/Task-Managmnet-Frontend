// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-500 py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Task Manager Pro. All Rights Reserved.
        </p>
        <div className="mt-4 space-x-4">
          <a
            href="https://facebook.com"
            className="hover:text-primary transition"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            className="hover:text-primary transition"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            className="hover:text-primary transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
