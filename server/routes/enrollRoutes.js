import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  enrollRazorpay,
  getAllEnrollCourseAmount,
  getEnrollCourses,
  verifyRazorpayPayment,
} from "../controllers/enrollController.js";

const enrollRouter = express.Router();

enrollRouter.post("/razorpay", authUser, enrollRazorpay);
enrollRouter.get("/courses", authUser, getEnrollCourses);
enrollRouter.post("/razorpay/verify", verifyRazorpayPayment);
enrollRouter.get("/earning", authUser, getAllEnrollCourseAmount);

export default enrollRouter;
