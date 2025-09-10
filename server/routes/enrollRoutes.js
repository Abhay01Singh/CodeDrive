import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  enrollRazorpay,
  getEnrollCourses,
} from "../controllers/enrollController.js";

const enrollRouter = express.Router();

enrollRouter.post("/razorpay", authUser, enrollRazorpay);
enrollRouter.get("/courses", authUser, getEnrollCourses);

export default enrollRouter;
