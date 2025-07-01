import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  enrollCourse,
  getPaidCourses,
} from "../controllers/EnrollController.js";

const enrollRouter = express.Router();
enrollRouter.post("/stripe", authUser, enrollCourse);

enrollRouter.get("/course", authUser, getPaidCourses);

export default enrollRouter;
