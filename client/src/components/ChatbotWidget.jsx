// ChatbotWidget.jsx
import React, { useState } from "react";
import Chatbot from "./../components/ChatBot";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`
          fixed bottom-7 right-7 z-50
          bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700
          hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700
          text-white rounded-full p-4 shadow-lg
          transition-transform duration-300 ease-in-out
          hover:scale-110 focus:outline-none cursor-pointer
        `}>
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="
            fixed bottom-[5.5rem] right-7 w-full max-w-[120vh] h-[85vh]
            bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-indigo-200 overflow-hidden
            z-60 animate-fade-in ring-1 ring-indigo-300/60 transition-shadow duration-300 hover:shadow-indigo-400/40
          ">
          <Chatbot />
        </div>
      )}

      {/* Fade-in animation for chat */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.35s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </>
  );
}
