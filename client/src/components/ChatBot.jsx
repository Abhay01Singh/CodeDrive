// components/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! 👋 Ask me anything about coding or software. 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
        credentials: "include",
      });
      const data = await res.json();
      const botMsg = { role: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error: Unable to connect to the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="min-h-[85vh] max-h-[80vh] flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-center py-5 text-2xl font-extrabold shadow-md">
        💬 CodeDrive Chatbot
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-300/40">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[75%] px-5 py-4 rounded-3xl text-base font-medium shadow ${
                m.role === "user"
                  ? "ml-auto bg-gradient-to-r from-blue-600 to-indigo-500 text-white"
                  : "mr-auto bg-white/90 text-gray-900 border border-gray-200"
              }`}>
              {m.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mr-auto bg-white/70 text-indigo-600 px-5 py-3 rounded-3xl shadow text-base">
            <span className="dot-typing"></span>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center gap-4 bg-white/60 backdrop-blur-lg p-4 border-t border-white/30">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-5 py-3 rounded-full bg-white text-gray-800 placeholder-gray-500 font-medium outline-none focus:ring-4 focus:ring-indigo-400"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-full shadow-lg transition-transform hover:scale-105 disabled:opacity-50">
          Send
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </form>

      <style>{`
        .dot-typing {
          position: relative;
          left: 6px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #4f46e5;
          display: inline-block;
          box-shadow: 14px 0 #4f46e5, 28px 0 #4f46e5;
          animation: dotTyping 1.5s infinite linear;
        }
        @keyframes dotTyping {
          0%,100% { box-shadow: 14px 0 #4f46e5, 28px 0 #4f46e5; }
          25% { box-shadow: 14px -10px #4f46e5, 28px 0 #4f46e5; }
          50% { box-shadow: 14px 0 #4f46e5, 28px -10px #4f46e5; }
          75% { box-shadow: 14px 0 #4f46e5, 28px 0 #4f46e5; }
        }
      `}</style>
    </div>
  );
}
