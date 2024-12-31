"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, id }) => {
  const [chats, setChats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [chatTitle, setChatTitle] = useState(""); // Input state for the modal
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("unoClave-token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setChats(data.chats);
        } else {
          console.error("Failed to fetch chats:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  // Debugging: Check state changes
  useEffect(() => {
    console.log("Modal state changed:", isModalOpen);
  }, [isModalOpen]);

  // Function to start a new chat
  const startNewChat = async () => {
    if (!chatTitle.trim()) {
      toast.error("Please enter a chat name");
      return;
    }

    try {
      const token = localStorage.getItem("unoClave-token");

      if (!token) {
        console.error("User not authenticated. Redirecting to login.");
        router.push("/login");
        return;
      }

      const chatPayload = {
        title: chatTitle,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(chatPayload),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error creating chat:", error.message || response.statusText);
        return;
      }

      const data = await response.json();
      toast.success("New Chat Created");
      const { chatId } = data.chat;

      if (chatId) {
        setChats((prevChats) => [...prevChats, { id: chatId, title: chatTitle }]); // Update chats list
        router.push(`/dashboard/chat/${chatId}`);
        setIsModalOpen(false); // Close modal on success
        setChatTitle(""); // Clear the title input
      } else {
        console.error("Chat ID not returned from API.");
      }
    } catch (error) {
      toast.success("Created New Chat");
      console.error("Error starting new chat:", error.message);
    }
  };

  return (
    <div
      className={`z-10 ${
        isSidebarOpen ? "w-64" : "w-20"
      } fixed left-0 top-0 h-full bg-[#40065D] text-white p-6 space-y-4 transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col">
        {/* Sidebar Toggle */}
        <div className="flex justify-between items-center mb-4">
          {!isSidebarOpen ? (
             <button
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className="text-[#40065D] rounded-full bg-white p-2 text-2xl ml-auto"
           >
             <FaArrowRight/>
           </button>
          ) : (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-violet-700 rounded-full bg-white p-2 text-2xl ml-auto"
            >
              <FaArrowLeft/>
            </button>
          )}
        </div>

        {/* Sidebar Content */}
        {isSidebarOpen && (
          <>
            <h3 className="font-bold text-2xl mb-16">Chats</h3>
            <Link
              href="/dashboard"
              className="bg-[#8921d2] w-full py-2 rounded text-white hover:bg-[#9b50c0] mb-4 text-center"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                console.log("New Chat button clicked!");
                setIsModalOpen(true);
              }}
              className="bg-[#8921d2] w-full py-2 rounded text-white hover:bg-[#9b50c0] mb-4"
            >
              New Chat
            </button>
            <div
              className="space-y-2 mt-4 overflow-y-auto"
              style={{ maxHeight: "50vh" }} 
            >
              {chats.length === 0 ? (
                <p className="text-sm text-gray-300">No chats started yet</p>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => router.push(`/dashboard/chat/${chat.id}`)}
                    className={`cursor-pointer p-2 rounded text-center hover:bg-[#9b50c0] ${
                      parseInt(id, 10) === chat.id ? "bg-[#9b50c0] font-bold" : ""
                    }`}
                  >
                    {chat.title || `Chat ${chat.id}`}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-[#40065D]">Start New Chat</h2>
            <input
              type="text"
              value={chatTitle}
              onChange={(e) => setChatTitle(e.target.value)}
              placeholder="Enter chat title"
              className="w-full border border-gray-700 p-2 rounded mb-4 text-black "
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setChatTitle(""); // Clear title on cancel
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-black"
              >
                Cancel
              </button>
              <button
                onClick={startNewChat}
                className="px-4 py-2 bg-[#8921d2] text-white rounded hover:bg-[#9b50c0]"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
