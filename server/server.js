import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import http from "http";
import { Server } from "socket.io";

// Routes
import userRouter from "./routes/userRoutes.js";
import instructorRouter from "./routes/instructorRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import enrollRouter from "./routes/enrollRoutes.js";
import doubtRouter from "./routes/doubtRoutes.js";
import { saveMessage } from "./controllers/doubtController.js";

import chatRouter from "./routes/chatAIRoutes.js";
import { razorpayWebHook } from "./controllers/enrollController.js";

const app = express();
const port = 3007;

// Connect DB and Cloudinary
await connectDB();
await connectCloudinary();

app.post(
  "/razorpay/webhook",
  express.json({ type: "application/json" }),
  razorpayWebHook
);

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://codedrive-frontend.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", (req, res) => {
  res.send("API is running....");
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/instructor", instructorRouter);
app.use("/api/course", courseRouter);
app.use("/api/enroll", enrollRouter);
app.use("/api/doubt", doubtRouter);
app.use("/api", chatRouter);

// Create HTTP + Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://codedrive-frontend.onrender.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO logic for doubt chat

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  socket.on("message", async (messageData) => {
    const { roomId } = messageData;
    io.to(roomId).emit("message", messageData); // broadcast
    await saveMessage(messageData); // save to DB
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`User left room ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
