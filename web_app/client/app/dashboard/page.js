"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Chat from "../[components]/Chat";
import dummyData from "../../public/dummyData.json";
import Image from "next/image";
import Sidebar from "../[components]/Sidebar"; // Import Sidebar component
import Header from "../[components]/Header"; // Import Header component

const DashboardPage = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const router = useRouter();

  useEffect(() => {
    setChats(dummyData.chats);
  }, []);

  const currentPage = currentChat ? currentChat.name : "Dashboard"; // Dynamic page title

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 w-full ${isSidebarOpen ? 'ml-64' : 'ml-20'}`} 
      >
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} currentPage={currentPage}/>

        <div className="container mx-auto px-6 mt-4">
          {/* Chat or Welcome Section */}
          {isSidebarOpen ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
           { /* Welcome Message */}
                  <h2 className="text-3xl font-semibold  text-[#40065D]">
                    It’s a Great Day to Start a Chat!
                  </h2>
                  <div className="hidden sm:block">
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    You haven’t started any chats yet. Your dashboard is where you can track and manage all of your conversations.
                    Feel free to initiate your first chat whenever you&apos;re ready. Stay connected, stay productive!
                  </p>

                  {/* Illustration or Icon */}
                  <div className="mt-6">
                    <Image
                    src="/welcome-icon.png"
                    width={400}
                    height={400}
                    alt="Welcome Illustration"
                    className="rounded-lg mx-auto"
                    />
                  </div>

                  {/* Encouraging Message */}
                  <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                    The power of conversation is at your fingertips. Your next step is to get started with chatting and managing tasks.
                  </p>
                  </div>
                  </div>
                  ) : (
                  <div className="flex flex-col items-center justify-center text-center space-y-8">
                    {/* Welcome Message */}
              <h2 className="text-3xl font-semibold text-[#40065D]">
                It’s a Great Day to Start a Chat!
              </h2>
              <p className="text-lg text-gray-600 max-w-[60%] mx-auto">
                You haven’t started any chats yet. Your dashboard is where you can track and manage all of your conversations.
                Feel free to initiate your first chat whenever you&apos;re ready. Stay connected, stay productive!
              </p>

              {/* Illustration or Icon */}
              <div className="mt-6">
                <Image
                  src="/welcome-icon.png"
                  width={400}
                  height={400}
                  alt="Welcome Illustration"
                  className="rounded-lg mx-auto"
                />
              </div>

              {/* Encouraging Message */}
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                The power of conversation is at your fingertips. Your next step is to get started with chatting and managing tasks.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
