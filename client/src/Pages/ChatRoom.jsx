// src/pages/student/ChatRoom.jsx

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAppContext } from "../context/AppContext";

const ChatRoom = () => {
  const { roomId } = useParams();
  const { user, axios } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.emit("joinRoom", roomId);

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("message");
      socket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/doubt/messages/${roomId}`);
        if (res.data.success) {
          setMessages(res.data.messages);
          scrollToBottom();
        }
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchMessages();
  }, [roomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      roomId,
      text: message.trim(),
      sender: user?.name,
      isMentor: false,
      timestamp: new Date().toISOString(),
    };

    socketRef.current?.emit("message", newMsg);
    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <div className="h-[500px] bg-white shadow rounded-lg flex flex-col">
        <div className="p-4 text-lg font-semibold bg-indigo-50 border-b">
          Student Doubt Chat
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === user?.name ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === user?.name ? "bg-indigo-100" : "bg-gray-200"
                }`}>
                <div className="text-sm font-semibold">{msg.sender}</div>
                <div className="text-sm">{msg.text}</div>
                <div className="text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
            placeholder="Type your doubt..."
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
