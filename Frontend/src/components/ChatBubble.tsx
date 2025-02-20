import React from "react";

interface ChatBubbleProps {
  message: string;
  sender: "user" | "bot";
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 text-wrap h-auto`}>
      <div
        className={`text-wrap h-auto max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
