import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AVATAR_MENTOR =
  "https://ui-avatars.com/api/?name=RitVik&background=4f46e5&color=fff&size=64";
const AVATAR_STUDENT =
  "https://ui-avatars.com/api/?name=Student&background=6366f1&color=fff&size=64";

const MentorChat = () => {
  const { roomId } = useParams();
  const { user, axios } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
    });
    newSocket.on("connect", () => newSocket.emit("joinRoom", roomId));
    newSocket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });
    setSocket(newSocket);
    return () => {
      newSocket.emit("leaveRoom", roomId);
      newSocket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const { data } = await axios.get(`/api/doubt/messages/${roomId}`);
        if (data.success) {
          setMessages(data.messages);
          scrollToBottom();
        }
      } catch (err) {
        toast.error("Failed to load messages");
      }
    };
    loadMessages();
  }, [roomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !socket) return;
    const msg = {
      roomId,
      text: newMsg.trim(),
      sender: "RitVik",
      isMentor: true,
      timestamp: new Date().toISOString(),
    };
    socket.emit("message", msg);
    setNewMsg("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex flex-col h-[600px] bg-gradient-to-tr from-indigo-100 via-white to-indigo-200 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b bg-gradient-to-r from-indigo-500 to-indigo-700">
          <img
            src={AVATAR_MENTOR}
            alt="Mentor"
            className="w-10 h-10 rounded-full ring-2 ring-indigo-300"
          />
          <h2 className="text-xl font-bold text-white drop-shadow">
            Mentor Chat Session
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth bg-opacity-30">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end ${
                msg.isMentor ? "justify-end" : "justify-start"
              }`}>
              {!msg.isMentor && (
                <img
                  src={AVATAR_STUDENT}
                  alt="Student"
                  className="w-8 h-8 rounded-full mr-2 shadow-md"
                />
              )}
              <div
                className={`max-w-[70%] rounded-xl p-4 shadow-xl transition ${
                  msg.isMentor
                    ? "bg-gradient-to-br from-indigo-200 to-indigo-100 text-indigo-900 border border-indigo-300"
                    : "bg-white text-gray-900 border border-gray-200"
                }`}>
                <p
                  className={`text-xs font-semibold ${
                    msg.isMentor ? "text-indigo-700" : "text-gray-600"
                  }`}>
                  {msg.sender}{" "}
                  {msg.isMentor && (
                    <span className="ml-1 bg-indigo-500 text-white px-2 py-0.5 rounded shadow">
                      Mentor
                    </span>
                  )}
                </p>
                <p className="mt-2 text-base leading-relaxed">{msg.text}</p>
                <p className="text-xs text-gray-500 mt-2 text-right italic">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
              {msg.isMentor && (
                <img
                  src={AVATAR_MENTOR}
                  alt="Mentor"
                  className="w-8 h-8 rounded-full ml-2 shadow-md"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={sendMessage}
          className="p-4 border-t bg-gradient-to-l from-indigo-100 to-white">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-indigo-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 bg-white shadow-md transition"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:bg-indigo-800 transition">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorChat;
