import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  enrollStripe,
  getEnrollCourses,
} from "../controllers/enrollController.js";

const enrollRouter = express.Router();

enrollRouter.post("/stripe", authUser, enrollStripe);
enrollRouter.get("/courses", authUser, getEnrollCourses);

export default enrollRouter;
