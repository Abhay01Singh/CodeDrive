import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const MentorChat = () => {
  const { roomId } = useParams();
  const { user, axios } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io("https://codedrive-backend-gscb.onrender.com", {
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      newSocket.emit("joinRoom", roomId);
    });

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
      sender: user?.name || "Mentor",
      isMentor: true,
      timestamp: new Date().toISOString(),
    };

    socket.emit("message", msg);
    setNewMsg("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md">
        <div className="p-4 border-b bg-indigo-50">
          <h2 className="text-xl font-semibold text-indigo-700">
            Mentor Chat Session
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.isMentor ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.isMentor ? "bg-indigo-100 text-indigo-900" : "bg-gray-100"
                }`}>
                <p className="text-xs font-semibold text-gray-600">
                  {msg.sender} {msg.isMentor && "(Mentor)"}
                </p>
                <p className="mt-1">{msg.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorChat;
