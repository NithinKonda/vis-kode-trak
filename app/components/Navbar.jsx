import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="flex justify-end items-center py-4 px-6 bg-gray-800 text-white">
      <ul className="flex space-x-6">
        <li>
          <Link href="/file-activity-log">File Activity Log</Link>
        </li>
        <li>
          <Link href="/file-extension-time">File extension Log</Link>
        </li>
        <li>
          <Link href="/usage-log">Usage Log</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
