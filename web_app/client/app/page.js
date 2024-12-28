"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./[components]/SidebarLogout";
import Header from "./[components]/LogoutHeader";
import DropDownRow from "./[components]/DropDownRow";
import MessageInputBox from "./[components]/MessageInputBox";
import HomeModal from "./[components]/HomeModal";

export default function ChatPage() {
  const [chat, setChat] = useState({ messages: [] }); // Local chat state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(true); // Modal visibility state
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("unoClave-token");

      if (token) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            // Redirect to dashboard if token is valid
            router.push("/dashboard");
          } else {
            console.error("Invalid token. Staying on chat page.");
          }
        } catch (error) {
          console.error("Error verifying token:", error);
        }
      }
    };

    checkToken();
  }, [router]);

  const handleSendMessage = async (prompt) => {
    if (prompt.trim()) {
      const newMessageObject = {
        role: "You",
        content: prompt.trim(),
      };

      // Add user's message locally
      setChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessageObject],
      }));

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/ai-unauthorised`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: newMessageObject.content }),
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (response.ok && data.data) {
          const aiResponse = JSON.parse(data.data).response;

          const aiMessageObject = {
            role: "ai",
            content: aiResponse,
          };

          setChat((prevChat) => ({
            ...prevChat,
            messages: [...prevChat.messages, aiMessageObject],
          }));
        } else {
          console.error("Error from AI API:", data.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error sending message to AI:", error);
      }
    }
  };

  const handleModalOption = (option) => {
    if (option === "signUp") {
      router.push("/signup"); // Redirect to signup page
    }
    setShowModal(false); // Close the modal if "Continue Without Signup" is chosen
  };

  let content;

  if (!chat) {
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
      {showModal && (
        <HomeModal handleModalOption={handleModalOption} />
      )}

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} id={pathname.split("/").pop()} />

      <div
        className={`transition-all duration-300 flex flex-col min-h-[90vh] text-gray-900 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } w-full`}
      >
        <div className="mb-16 sticky top-0 flex flex-col justify-center w-full bg-white pb-8">
          <Header
            isSidebarOpen={isSidebarOpen}
            currentPage={chat ? `Local Chat` : "Chat Not Found"}
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
