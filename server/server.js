import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import instructorRouter from "./routes/instructorRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import enrollRouter from "./routes/enrollRoutes.js";
import { stripeWebhooks } from "./controllers/enrollContoller.js";

const app = express();
const port = process.env.PORT || 3007;

await connectDB();
await connectCloudinary();

const allowedOrigins = ["http://localhost:5173"];

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// middleware configurations
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the EduHub API!");
});

app.use("/api/user", userRouter);
app.use("/api/instructor", instructorRouter);
app.use("/api/course", courseRouter);
app.use("/api/address", addressRouter);
app.use("/api/enroll", enrollRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
