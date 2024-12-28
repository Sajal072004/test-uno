"use client";

import { useState } from "react";

export default function MessageInputBox({ onSendMessage }) {
  const [prompt, setPrompt] = useState("");

  const handleSend = () => {
    if (prompt.trim()) {
      onSendMessage(prompt); 
      setPrompt("");
    }
  };

  return (
    <div className="p-6 bg-gray-100 sticky bottom-0 flex justify-center w-full">
      <div className="flex items-center space-x-4 w-full max-w-3xl">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#40065D] text-black"
        />
        <button
          onClick={handleSend}
          className="bg-[#40065D] text-white px-6 py-2 rounded-lg hover:bg-[#5E2A82] transition-all duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}
