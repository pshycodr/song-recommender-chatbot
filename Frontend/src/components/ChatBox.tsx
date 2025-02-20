import React, { useState } from "react";
import ChatBubble from "./ChatBubble";
import SongSuggestions from "./SongSuggestions";
import { ChatResponse } from "../types";

export const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; message: string }[]>([]);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user" as const, message: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data: ChatResponse = await res.json();
      setResponse(data); // Storing the response for song suggestions
      const botMessage = { sender: "bot" as const, message: data.message };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", message: "⚠️ Error fetching response. Please try again." },
      ]);
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="h-[32rem] w-1/2 border border-gray-300 rounded-lg flex flex-col shadow-lg">
      <div className="flex-1 overflow-y-scroll p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <ChatBubble key={index} sender={msg.sender} message={msg.message} />
        ))}
        {response && <SongSuggestions response={response} />}
      </div>
      <div className="flex border-t border-gray-300 p-2 bg-white">
        <input
          type="text"
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};
