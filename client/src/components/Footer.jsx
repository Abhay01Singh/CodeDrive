import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-white/90 via-blue-50/80 to-indigo-100/80 backdrop-blur-lg shadow-inner border-t border-indigo-100 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-gray-600">
        &copy; {new Date().getFullYear()} CodeDrive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
