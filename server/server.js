import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import cookieParser from "cookie-parser";
import "dotenv/config";

import userRouter from "./routes/userRoutes.js";
import instructorRouter from "./routes/instructorRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import { stripeWebHooks } from "./controllers/EnrollController.js";
import enrollRouter from "./routes/enrollRoutes.js";

const app = express();
const port = 3007;

await connectDB();

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

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebHooks);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("EduHub API Running!");
});

app.use("/api/user", userRouter);
app.use("/api/instructor", instructorRouter);
app.use("/api/course", courseRouter);
app.use("/api/address", addressRouter);
app.use("/api/enroll", enrollRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
