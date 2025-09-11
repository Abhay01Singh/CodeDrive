import express from "express";
import { getMessages, getChatRooms } from "../controllers/doubtController.js";
import authInstructor from "../middlewares/authInstructor.js";

const doubtRouter = express.Router();

doubtRouter.get("/messages/:roomId", authInstructor, getMessages);
doubtRouter.get("/rooms", authInstructor, getChatRooms);

export default doubtRouter;
