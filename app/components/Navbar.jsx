import React from "react";
const Navbar = () => {
  return (
    <nav className="flex justify-end items-center py-4 px-6 bg-gray-800 text-white">
      <ul className="flex space-x-6">
        <li>
          <a href="/" className="hover:text-gray-300">
            Home
          </a>
        </li>
        <li>
          <a href="/file-activity-log" className="hover:text-gray-300">
            File Activity Log
          </a>
        </li>
        <li>
          <a href="/usage-log" className="hover:text-gray-300">
            Usage Log
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
