"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa"; // Icon for the hamburger menu

const Header = ({ isSidebarOpen, currentPage }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown menu

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("unoClave-token");
    router.push("/");
  };

  // Function to handle profile navigation
  const handleProfile = () => {
    router.push("/profile");
  };

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header
      className={`w-full flex justify-between items-center p-6 bg-[#40065D] text-white shadow-md transition-all duration-300`}
    >
      {/* Left: Dynamic Page Title */}
      <h1 className="sm:text-xl md:text-4xl font-semibold">
        {currentPage || "Dashboard"}
      </h1>

      {/* Right: Profile and Logout buttons */}
      <div className={`relative  items-center md:space-x-6 ${isSidebarOpen ? 'hidden sm:flex' : 'flex'} `}>
        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={handleProfile}
            className="bg-[#5E2A82] text-white py-2 px-6 rounded-md hover:bg-[#7A45A7]"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-[#5E2A82] text-white py-2 px-6 rounded-md hover:bg-[#7A45A7]"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu: Hamburger Icon */}
        <button
          onClick={toggleDropdown}
          className="md:hidden flex items-center justify-center p-2 text-[#5E2A82]  rounded-md bg-white shadow-md shadow-violet-600 "
        >
          <FaBars size={20} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-12 bg-white text-black rounded-md w-60 z-50 border border-violet-600 p-4 shadow-lg md:hidden">
            <button
              onClick={handleProfile}
              className="block w-full text-center px-4 py-2 border border-violet-600 rounded-md bg-violet-600 text-white font-semibold hover:bg-violet-500 hover:border-violet-800 mb-3 transition duration-200"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-center px-4 py-2 border border-violet-600 rounded-md bg-violet-600 text-white font-semibold hover:bg-violet-500 hover:border-violet-800 mb-3 transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
