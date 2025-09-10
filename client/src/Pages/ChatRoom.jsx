import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAppContext } from "../context/AppContext";

const socket = io("https://codedrive-backend-gscb.onrender.com"); // adjust to your backend

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
        if (res.data.success) {
          setMessages(res.data.messages);
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

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMsg = {
      roomId,
      text: message,
      sender: user?.name,
      isMentor: false,
      timestamp: new Date().toISOString(),
    };

    socket.emit("message", newMsg);
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
                msg.isMentor ? "justify-start" : "justify-end"
              }`}>
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.isMentor ? "bg-gray-200" : "bg-indigo-100"
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
        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
            placeholder="Type your doubt..."
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
