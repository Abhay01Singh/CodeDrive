import express from "express";
import authUser from "../middlewares/authUser.js";
import { enrollStripe } from "../controllers/EnrollController.js";

const enrollRouter = express.Router();

enrollRouter.post("/stripe", authUser, enrollStripe);

export default enrollRouter;
