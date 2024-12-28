"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa"; // Icon for the hamburger menu

const Header = ({ isSidebarOpen, currentPage }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown menu

  // Function to handle logout
  const handleLogin = () => {
    
    router.push("/login");
  };

  // Function to handle profile navigation
  const handleSignup = () => {
    router.push("/signup");
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
        {"UnoClave"}
      </h1>

      {/* Right: Profile and Logout buttons */}
      <div className={`relative  items-center md:space-x-6 ${isSidebarOpen ? 'hidden sm:flex' : 'flex'} `}>
        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={handleSignup}
            className="bg-[#5E2A82] text-white py-2 px-6 rounded-md hover:bg-[#7A45A7]"
          >
            SignUp
          </button>
          <button
            onClick={handleLogin}
            className="bg-[#5E2A82] text-white py-2 px-6 rounded-md hover:bg-[#7A45A7]"
          >
            Login
          </button>
        </div>

        {/* Mobile Menu: Hamburger Icon */}
        <button
          onClick={toggleDropdown}
          className="md:hidden flex items-center justify-center p-2 bg-[#5E2A82] rounded-md hover:bg-[#7A45A7]"
        >
          <FaBars size={20} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-12 bg-white text-black shadow-lg rounded-lg w-40 z-50">
            <button
              onClick={handleSignup}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
             SignUp
            </button>
            <button
              onClick={handleLogin}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;