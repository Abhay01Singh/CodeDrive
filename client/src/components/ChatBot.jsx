import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Call backend (update API endpoint as needed)
    const res = await fetch(
      "https://codedrive-backend-gscb.onrender.com/api/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      }
    );
    const data = await res.json();
    const botMsg = { role: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="w-full h-full">
      <div
        className="
          rounded-2xl bg-gradient-to-br from-white/80 via-blue-50/80 to-indigo-100/80
          shadow-2xl border border-indigo-100 backdrop-blur-md p-4 flex flex-col h-96
        ">
        <div className="flex-1 overflow-y-auto mb-2 px-1">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className={`p-2 mb-2 rounded-xl max-w-[80%] text-sm shadow ${
                  m.role === "user"
                    ? "ml-auto bg-gradient-to-r from-blue-600 to-indigo-400 text-white"
                    : "mr-auto bg-white text-gray-900 border border-indigo-50"
                }`}>
                {m.text}
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mr-auto bg-gray-200 text-gray-600 p-2 mb-2 rounded-xl w-fit shadow text-sm">
              <span className="dot-typing"></span>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>
        {/* Input area */}
        <form
          className="flex items-center mt-2 bg-white/90 rounded-xl shadow-md"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="
              flex-1 px-4 py-2 rounded-xl bg-white text-gray-900
              font-medium placeholder-gray-400 outline-none border-none
              focus:ring-2 focus:ring-blue-400
            "
            autoFocus
            placeholder="Ask about CodeDrive topics..."
            style={{ backgroundColor: "#fff", color: "#222" }}
          />
          <button
            type="submit"
            className="
              bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold px-5 py-2
              rounded-xl shadow-md ml-2 transition-transform hover:scale-105
            "
            disabled={loading}>
            Send
          </button>
        </form>
        {/* Animated typing dots */}
        <style>{`
          .dot-typing {
            position: relative;
            left: 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #364fc7;
            display: inline-block;
            box-shadow: 14px 0 #364fc7, 28px 0 #364fc7;
            animation: dotTyping 1.8s infinite linear;
          }
          @keyframes dotTyping {
            0% { box-shadow: 14px 0 #364fc7, 28px 0 #364fc7; }
            25% { box-shadow: 14px -10px #364fc7, 28px 0 #364fc7; }
            50% { box-shadow: 14px 0 #364fc7, 28px -10px #364fc7; }
            75% { box-shadow: 14px 0 #364fc7, 28px 0 #364fc7; }
            100% { box-shadow: 14px 0 #364fc7, 28px 0 #364fc7; }
          }
        `}</style>
      </div>
    </div>
  );
}
