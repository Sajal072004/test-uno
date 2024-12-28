"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SidebarLogout = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const router = useRouter();

  const startNewChat = () => {
    router.push("/login");
  };

  return (
    <div
      className={`z-10 ${isSidebarOpen ? "w-64" : "w-20"} fixed left-0 top-0 h-full bg-[#40065D] text-white p-6 space-y-4 transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col">
        {/* Sidebar Toggle */}
        <div className="flex justify-between items-center mb-4">
          {!isSidebarOpen ? (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white text-3xl mx-auto"
            >
              ☰
            </button>
          ) : (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white text-3xl ml-auto"
            >
              X
            </button>
          )}
        </div>

        {/* Sidebar Content */}
        {isSidebarOpen && (
          <>
            <h3 className="font-bold text-xl mb-16">Welcome</h3>

            <button
              onClick={startNewChat}
              className="bg-[#8921d2] w-full py-2 rounded text-white hover:bg-[#9b50c0] mb-4"
            >
              New Chat
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarLogout;
