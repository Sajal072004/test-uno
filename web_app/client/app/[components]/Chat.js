"use client";

export default function Chat({ chat }) {
  if (!chat) {
    return (
      <div className="flex justify-center items-center h-screen text-center text-gray-600">
        No chat selected. Please select or start a new chat.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#40065D] text-white p-4 rounded-t-lg shadow-md">
        <h1 className="text-2xl font-semibold">{`Chat with ${chat.name}`}</h1>
      </header>

      {/* Chat Messages */}
      <div className="flex-grow p-6 overflow-y-auto">
        {chat.messages && chat.messages.length > 0 ? (
          chat.messages.map((message, index) => (
            <div
              key={index}
              className={`message p-4 mb-2 rounded-lg ${
                message.sender === "AI" ? "bg-[#f1f1f1] text-[#40065D]" : "bg-[#40065D] text-white"
              }`}
            >
              <strong className="font-semibold">{message.sender}:</strong> {message.text}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">No messages yet. Start chatting!</div>
        )}
      </div>

      {/* Message Input and Send Button */}
      <div className="p-4 bg-white shadow-md border-t">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40065D] text-gray-900"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const newMessage = {
                  sender: "You",
                  text: e.target.value,
                };
                chat.messages.push(newMessage);
                e.target.value = ""; // Clear input
              }
            }}
          />
          <button
            onClick={() => {
              const newMessage = {
                sender: "AI",
                text: "This is an AI response.",
              };
              chat.messages.push(newMessage);
            }}
            className="bg-[#40065D] text-white px-6 py-2 rounded-lg hover:bg-[#5E2A82] transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
