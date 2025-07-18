import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3007";

const ChatRoom = () => {
  const { roomId } = useParams();
  const { user, axios } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Connected to chat server");
      newSocket.emit("joinRoom", roomId);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      toast.error("Chat connection failed. Retrying...");
    });

    newSocket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    newSocket.on("error", (error) => {
      toast.error(error);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.emit("leaveRoom", roomId);
        newSocket.disconnect();
      }
    };
  }, [roomId]);

  // Fetch existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/doubt/messages/${roomId}`);
        if (data.success) {
          setMessages(data.messages);
          scrollToBottom();
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [roomId, axios]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !socket) return;

    const messageData = {
      roomId,
      text: message.trim(),
      sender: user?.name || "Anonymous",
      isMentor: false,
      timestamp: new Date().toISOString(),
    };

    socket.emit("message", messageData);
    setMessage("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <div className="h-[600px] bg-white shadow-lg rounded-lg flex flex-col">
        <div className="p-4 text-lg font-semibold bg-indigo-50 border-b">
          Student Doubt Chat
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.isMentor ? "justify-start" : "justify-end"
              }`}>
              <div
                className={`p-3 rounded-lg max-w-xs lg:max-w-md ${
                  msg.isMentor
                    ? "bg-gray-100 text-gray-800"
                    : "bg-indigo-100 text-indigo-900"
                }`}>
                <div className="text-sm font-semibold">
                  {msg.sender} {msg.isMentor && "(Mentor)"}
                </div>
                <div className="text-sm mt-1">{msg.text}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type your doubt..."
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
