import express from "express";
import { upload } from "../configs/multer.js";
import {
  addCourse,
  courseList,
  getSingleCourse,
} from "../controllers/CourseController.js";
import authInstructor from "../middlewares/authInstructor.js";

const courseRouter = express.Router();

courseRouter.post(
  "/add",
  upload.fields([{ name: "thumbnail", maxCount: 1 }]),
  authInstructor,
  addCourse
);

courseRouter.get("/list", courseList);
courseRouter.get("/:id", getSingleCourse);

export default courseRouter;
