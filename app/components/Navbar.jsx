import React from "react";
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <ul className="flex justify-around">
        <li>
          <a href="/file-activity-log" className="hover:text-gray-400">
            File Activity Log
          </a>
        </li>
        <li>
          <a href="/usage-log" className="hover:text-gray-400">
            Usage Log
          </a>
        </li>
        <li>
          <a href="/file-extension-time" className="hover:text-gray-400">
            File Extensions
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
