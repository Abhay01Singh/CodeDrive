import express from "express";
import {
  isAuthInstructor,
  loginInstructor,
  logoutInstructor,
} from "../controllers/instructorController.js";
import authInstructor from "../middlewares/authInstructor.js";

const instructorRouter = express.Router();
instructorRouter.post("/login", loginInstructor);
instructorRouter.get("/is-auth", authInstructor, isAuthInstructor);
instructorRouter.get("/logout", logoutInstructor);

export default instructorRouter;
