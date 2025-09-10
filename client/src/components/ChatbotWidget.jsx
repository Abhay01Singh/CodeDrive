import React, { useState } from "react";
import Chatbot from "./ChatBot";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)} // Toggle the open state
        className="fixed bottom-6 right-6 bg-blue-600 rounded-full p-4 shadow-lg text-white hover:bg-blue-700">
        💬
      </button>

      {/* Only show chat window when 'open' is true */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white/70 backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden">
          <Chatbot />
        </div>
      )}
    </>
  );
}
