"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "../../../[components]/Sidebar.js"; // Import Sidebar component
import Header from "../../../[components]/Header"; // Import Header component
import DropDownRow from "@/app/[components]/DropDownRow";
import MessageInputBox from "../../../[components]/MessageInputBox"; // Import the new MessageInputBox component

export default function ChatPage() {
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentChatId, setCurrentChatId] = useState(null);
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSendMessage = async (prompt) => {
    console.log("The prompt is: ", prompt);
    if (prompt.trim()) {
      const newMessageObject = {
        role: "You",
        content: prompt.trim(),
      };
  
      // Update the chat UI with the user's message immediately
      setChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessageObject],
      }));
  
      try {
        const token = localStorage.getItem("unoClave-token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/ai`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ prompt: newMessageObject.content }),
        });
  
        const data = await response.json();
        console.log("API Response: ", data);

  
        if (response.ok && data.data) {
          // Parse the AI's response from the stringified JSON
          const aiResponse = JSON.parse(data.data).response;
  
          const aiMessageObject = {
            role: "ai",
            content: aiResponse,
          };
  
          setChat((prevChat) => ({
            ...prevChat,
            messages: [...prevChat.messages, aiMessageObject],
          }));

          const id = pathname.split("/").pop();
    setCurrentChatId(id);
          console.log("the jwt while posting the data is ", token);
          const postResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userMessage:prompt ,aiMessage : aiResponse, chatId:id }),
          });
      
          console.log(postResponse , "this is post response");


          
        } else {
          console.error("Error from API:", data.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error sending message to AI:", error);
      }

      
    }

   





  };
  

  useEffect(() => {
    const id = pathname.split("/").pop();
    setCurrentChatId(id);

    if (id) {
      setLoading(true);

      const token = localStorage.getItem("unoClave-token");

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/chat/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Chat fetched successfully.") {
            setChat(data.chat);
            console.log("the data received is " , data.chat.messages);
          } else {
            setChat(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching chat:", error);
          setChat(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [pathname]);

  let content;

  if (loading) {
    content = (
      <div className="flex justify-center items-center h-screen text-lg text-gray-500">
        Loading...
      </div>
    );
  } else if (!chat) {
    content = (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">
        Chat not found.
      </div>
    );
  } else {
    content = (
      <div className="flex-grow p-6 overflow-y-auto space-y-4 flex flex-col items-center justify-center w-full mt-12">
        {chat.messages.length === 0 ? (
          <div className="text-center text-gray-500">No messages yet. Start chatting!</div>
        ) : (
          chat.messages.map((message, index) => {
            const messageClass = message.role === "ai"
              ? "bg-[#f1f1f1] text-[#40065D]"
              : "bg-[#40065D] text-white";
            const messageRole = message.role === "ai" ? "AI" : "You";

            return (
              <div
                key={index}
                className={`message p-4 mb-0 rounded-lg w-full ${messageClass}`}
              >
                <strong className="font-semibold">{messageRole}:</strong> {message.content}
              </div>
            );
          })
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} id={currentChatId} />

      <div
        className={`transition-all duration-300 flex flex-col min-h-[90vh] text-gray-900 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } w-full`}
      >
        <div className="mb-16 sticky top-0 flex flex-col justify-center w-full bg-white pb-8">
          <Header
            isSidebarOpen={isSidebarOpen}
            currentPage={chat ? `Chat with ${chat.title}` : "Chat Not Found"}
          />
          <div className="-mt-16">
            <DropDownRow />
          </div>
        </div>

        {content}

        {chat && <MessageInputBox onSendMessage={handleSendMessage} />}
      </div>
    </div>
  );
}
