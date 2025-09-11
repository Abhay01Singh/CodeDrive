import express from "express";

import authUser from "../middlewares/authUser.js";
import { chatbotResponse } from "../controllers/chatAIController.js";

const chatRouter = express.Router();

chatRouter.post("/api/chat", chatbotResponse);

export default chatRouter;
