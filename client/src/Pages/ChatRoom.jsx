import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAppContext } from "../context/AppContext";

const AVATAR_STUDENT =
  "https://ui-avatars.com/api/?name=Student&background=38bdf8&color=fff&size=48";
const AVATAR_MENTOR =
  "https://ui-avatars.com/api/?name=Mentor&background=6366f1&color=fff&size=48";

const socket = io(import.meta.env.VITE_BACKEND_URL); // adjust to your backend

const ChatRoom = () => {
  const { roomId } = useParams();
  const { user, axios } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", roomId);
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });
    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("message");
    };
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/doubt/messages/${roomId}`);
        if (res.data.success) setMessages(res.data.messages);
      } catch (error) {
        // handle error (could add toast, etc)
      }
    };
    fetchMessages();
  }, [roomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    const newMsg = {
      roomId,
      text: message,
      sender: user?.name || "Student",
      isMentor: false,
      timestamp: new Date().toISOString(),
    };
    socket.emit("message", newMsg);
    setMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-50 rounded-2xl shadow-2xl flex flex-col h-[580px] overflow-hidden border">
        <div className="flex gap-3 items-center px-5 py-4 bg-gradient-to-r from-sky-400 to-indigo-500 border-b shadow">
          <img
            src={AVATAR_STUDENT}
            alt="Student"
            className="w-10 h-10 rounded-full ring-2 ring-sky-200"
          />
          <span className="text-lg font-bold text-white drop-shadow">
            Student Doubt Chat
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth bg-opacity-20">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end ${
                msg.isMentor ? "justify-start" : "justify-end"
              }`}>
              {msg.isMentor && (
                <img
                  src={AVATAR_MENTOR}
                  alt="Mentor"
                  className="w-8 h-8 rounded-full mr-2 shadow-md"
                />
              )}
              <div
                className={`max-w-[70%] rounded-xl p-3 shadow-lg border transition ${
                  msg.isMentor
                    ? "bg-gradient-to-br from-gray-200 via-indigo-100 to-sky-100 text-indigo-900 border-indigo-200"
                    : "bg-gradient-to-br from-sky-300 to-white text-gray-900 border-sky-200"
                }`}>
                <div className="text-xs font-semibold text-sky-700 flex items-center">
                  {msg.sender}{" "}
                  {msg.isMentor && (
                    <span className="ml-1 bg-indigo-200 text-indigo-700 px-1.5 py-0.5 rounded">
                      Mentor
                    </span>
                  )}
                </div>
                <div className="mt-1 text-base">{msg.text}</div>
                <div className="text-xs text-gray-400 mt-2 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
              {!msg.isMentor && (
                <img
                  src={AVATAR_STUDENT}
                  alt="Student"
                  className="w-8 h-8 rounded-full ml-2 shadow-md"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="bg-gradient-to-l from-sky-100 to-indigo-50 p-4 border-t flex gap-2 items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border border-sky-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-200 bg-white shadow transition"
            placeholder="Type your doubt..."
          />
          <button
            onClick={sendMessage}
            className="px-6 py-2 bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:bg-indigo-700 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
