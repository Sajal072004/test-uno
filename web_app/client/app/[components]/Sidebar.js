"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, id }) => {
  const [chats, setChats] = useState([]);
  const router = useRouter();

 
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("unoClave-token")}`
          },
        });
        console.log("the chats are ", response.data);

        if (response.ok) {
          const data = await response.json();
          setChats(data.chats);
          console.log(data.chats);
        } else {
          console.error("Failed to fetch chats:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  // Start a new chat
  const startNewChat = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("unoClave-token");
  
      if (!token) {
        console.error("User not authenticated. Redirecting to login.");
        router.push("/login");
        return;
      }
  
      // Create a new chat request payload
      const chatPayload = {
        title: `Chat ${chats.length + 1}`,
      };
  
      // Make a POST request to create a new chat
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
  
      // Get the chat ID from the response
      const data = await response.json();
      const { chatId } = data.chat; // Assuming the API returns { chatId: "generated-id" }
  
      if (chatId) {
        // Redirect the user to the new chat page
        router.push(`/dashboard/chat/${chatId}`);
      } else {
        console.error("Chat ID not returned from API.");
      }
    } catch (error) {
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
            <h3 className="font-bold text-xl mb-16">Chats</h3>
            <Link
              href="/dashboard"
              className="bg-[#8921d2] w-full py-2 rounded text-white hover:bg-[#9b50c0] mb-4 text-center"
            >
              Dashboard
            </Link>
            <button
              onClick={startNewChat}
              className="bg-[#8921d2] w-full py-2 rounded text-white hover:bg-[#9b50c0] mb-4"
            >
              New Chat
            </button>
            <div
              className="space-y-2 mt-4 overflow-y-auto"
              style={{ maxHeight: "50vh" }} // Adjust for other elements like header and footer
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
                    {console.log(chat.title)}
                    {chat.title || `Chat ${chat.id}`} {/* Display chat title or fallback */}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
